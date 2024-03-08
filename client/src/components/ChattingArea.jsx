import { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import socket from "../socket";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";

const ChattingArea = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    if (!chats) {
        setChats([]);
    }

    const getChatData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
                },
            };
            const id = selectedChat._id;
            console.log(id);
            const { data } = await axios.get(`http://localhost:3000/api/message/${id}`, config);
            console.log(data);
            setMessages(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true)
        }

        const onDisconnect = () => {
            setIsConnected(false)
        }

        const onReceiveMessage = (message) => {
            const newReceivedMessage = {
                type: 'received',
                data: message
            };

            setMessages(prevMessages => {
                return [...prevMessages, newReceivedMessage];
            })
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('receive-message', onReceiveMessage);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('receive-message', onReceiveMessage);
        }
    }, [])

    const handleSentMessage = (message) => {
        const newSentMessage = {
            type: 'sent',
            data: message
        };

        setMessages(prevMessages => {
            return [...prevMessages, newSentMessage];
        })

        socket.emit('send-message', message);
    }
    useEffect(() => {
        getChatData();
    }, [selectedChat]);

    return (
        <>
            {isConnected && (
                <div className='flex flex-col w-full'>
                    <div className='flex items-center text-white min-h-16 px-5 shadow-lg'>
                        {/* TODO: Here goes the username of person you are talking to*/}
                        Testing User
                    </div>
                    {messages.map((message) => {
                        return (
                            <div key={message._id} className='flex items-center text-white min-h-16 px-5 shadow-sm hover:bg-[#1d2c3b]'>
                                {message.content}
                            </div>
                        )
                    })}
                    <Messages messages={messages} />
                    <MessageInput onSendMessage={handleSentMessage} />
                </div>
            )}
        </>
    );
}

export default ChattingArea;
