import { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import socket from "../socket";
import axios from "axios";
import { ChatContext } from "../context/ChatProvider";
var selectedChatCompare;
const ChattingArea = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const { selectedChat, user, chats, setChats } = useContext(ChatContext);
    const [inputMessage, setInputMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    
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

    return (
        <>
            {isConnected && (
                <div className='flex flex-col w-full'>
                    <div className='flex items-center  text-white min-h-16 px-5 shadow-lg'>
                        {/* TODO: Here goes the username of person you are talking to*/}
                        {selectedChat ? selectedChat.users.find((user) => user._id !== JSON.parse(localStorage.getItem("userInfo"))._id).name : ""}
                        <div className="flex justify-end w-full">
                            {user.name}
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
