import { useContext, useEffect, useRef, useState } from "react";
import Messages from "./Messages";
import socket from "../socket";
import axios from "axios";
import { ChatContext } from "../context/ChatProvider";
import Peer from "simple-peer"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Video from "./Video";


var selectedChatCompare;
const ChattingArea = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const { selectedChat, user, chats, setChats } = useContext(ChatContext);
    const [inputMessage, setInputMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const friendButtonRef = useRef(null);
    const userButton = useRef(null);

    const [calling, setCalling] = useState(false);
    const [stream, setStream] = useState();
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState('');
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [recevingCall, setRecevingCall] = useState(false);
    const [me, setMe] = useState('');

    const [myVideoStream, setMyVideoStream] = useState();
    const [userVideoStream, setUserVideoStream] = useState();

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                setStream(stream);
                console.log(stream);
                setMyVideoStream(stream);
            }); 

            socket.on("me", (id) => {
                setMe(id);
            });

            socket.on("callUser", (data) => {
                setRecevingCall(true);
                setCaller(data.from);
                setCallerSignal(data.signal);
            });
    }, []);

    const callUser = (id) => {
        console.log(id);
        const peer = new Peer({  // could cause an error
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", (data) => {
            socket.emit("callUser", { 
                userToCall: id, 
                signalData: data, 
                from: me, 
                name: user.name
            });
        })

        peer.on("stream", (stream) => {
            setUserVideoStream(stream);
        })

        peer.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        })

        connectionRef.current = peer;
    }

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller });
        })

        peer.on("stream", (stream) => {
            console.log(stream);
            setUserVideoStream(stream);
        })

        peer.signal(callerSignal);
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    }

    if (!chats) {
        setChats([]);
    }

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true)
        }

        const onDisconnect = () => {
            setIsConnected(false)
        }

        socket.emit('setup', user);

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        }
    }, [])
    useEffect(() => {
        socket.on("message received", (newMessageRecieved) => {
            if (newMessageRecieved.chat._id !== selectedChat._id) {
                return;
            }
            console.log(messages);
            setMessages([...messages, newMessageRecieved]);
        })
    })

    const getChatData = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
                },
            };
            const id = selectedChat._id;
            const { data } = await axios.get(`http://localhost:3000/api/message/${id}`, config);
            setMessages(data);
            socket.emit('join room', id);
        }
        catch (error) {
            console.error(error);
        }
    }


    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (inputMessage) {
            socket.emit('stop typing', selectedChat._id);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const message = {
                    content: inputMessage,
                    chatId: selectedChat._id,
                    sender: user._id
                };
                const { data } = await axios.post("http://localhost:3000/api/message", message, config);
                socket.emit("new message", data);
                data.sender = user._id;
                setMessages([...messages, data]);
                setInputMessage('');
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    useEffect(() => {
        getChatData();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    const handleUserInfo = () => {
        friendButtonRef.current.classList.toggle('hidden');
    }

    const handleFriendReq = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const friendId = selectedChat.users.find((user) => user._id !== JSON.parse(localStorage.getItem("userInfo"))._id)._id;
            console.log(friendId);
            const { data } = await axios.put('http://localhost:3000/api/users/addFriend', { friendId: friendId }, config)
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleUserClick = () => {
        userButton.current.classList.toggle('hidden');
    }

    const handleLogOut = () => {
        localStorage.removeItem("userInfo");
        window.location.reload();
    }


    return (
        <>
            {isConnected && (
                <div className='flex flex-col w-full'>
                    <div className='flex items-center  text-white min-h-16 px-5 shadow-lg'>
                        {/* TODO: Here goes the username of person you are talking to*/}
                        <div onClick={handleUserInfo}>
                            {selectedChat ? selectedChat.users.find((user) => user._id !== JSON.parse(localStorage.getItem("userInfo"))._id).name : ""}
                        </div>
                        <CopyToClipboard text={me}>
                            <div className="ml-2 cursor-pointer">Copy</div>
                        </CopyToClipboard>

                        <input onChange={(e) => setIdToCall(e.target.value)} value={idToCall} className="text-black" />

                        <div className="video-container ">
                                {console.log(myVideoStream)}
                                {stream && <Video width={300} media={myVideoStream} muted={true} />}
                                {callAccepted && !callEnded ? <Video width={300} media={userVideoStream} muted={false}/>: <div></div>}
                        </div>
                        {recevingCall && !callAccepted && (
                            <div>
                                <button onClick={answerCall}>Answer</button>
                            </div>
                        )}
                    <div className="call-button">
                        {callAccepted && !callEnded ? (
                            <button variant="contained" color="secondary" onClick={leaveCall}>
                                End Call
                            </button>
                        ) : (
                            <button className=" m-2 p-3 shadow-xl border-2 hover:bg-slate-900 " onClick={() => callUser(idToCall)}>
                                Call
                            </button>
                        )}
                        {idToCall}
				    </div>
                        
                        <div ref={friendButtonRef} onClick={handleFriendReq} className="absolute translate-y-12 shadow-md p-2 bg-[#1d2c3b] rounded-md -translate-x-5 hidden">
                            Add Friend
                        </div>
                        <div className="flex justify-end w-full" onClick={handleUserClick}>
                            {user.name}
                        </div>
                        <div ref={userButton} onClick={handleLogOut} className="translate-y-12 -translate-x-14 shadow-md p-2 bg-[#1d2c3b] rounded-md hidden">
                            LogOut
                        </div>
                    </div>
                    <Messages messages={messages} />
                    <div className="h-16 p-4 bg-[#092b3d]">
                        <form onSubmit={handleSendMessage} className='relative h-full w-full'>
                            <input
                                className="h-full w-full rounded-md bg-[#0b3b55] px-3 py-2 outline-none text-sm text-white"
                                placeholder="Message..."
                                value={inputMessage}
                                onChange={e => setInputMessage(e.target.value)}
                            />
                            <svg
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 512 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={handleSendMessage}
                            >
                                <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"></path>
                            </svg>
                        </form>
                    </div >
                </div>
            )}
        </>
    );
}

export default ChattingArea;
