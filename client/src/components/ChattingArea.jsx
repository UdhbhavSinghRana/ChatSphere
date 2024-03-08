import { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import socket from "../socket";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
var selectedChatCompare;
const ChattingArea = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    if (!chats) {
        setChats([]);
    }
    useEffect(() => {
        socket.emit('setup', user);
        socket.on('connected', () => {
            setIsConnected(true);
        });
    }, [])

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
            socket.emit('join-room', id);
        }
        catch (error) {
            console.error(error);
        }
    }

    

    useEffect(() => {
        socket.on('new message', (message) => {
            if (!selectedChatCompare || selectedChatCompare._id !== message.chat._id) {
                // give notification
            } 
            else {
                setMessages(prevMessages => {
                    return [...prevMessages, message];
                });
            }
        });
    });

    const handleSentMessage = async (message) => {
        const config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            },
        };
        const id = selectedChat._id;
        console.log(id);
        const { data } = await axios.post('http://localhost:3000/api/message', { chatId: id, content: message }, config);
        
        socket.emit('new message', data);
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
                    <Messages messages={messages} />
                    <MessageInput onSendMessage={handleSentMessage} />
                </div>
            )}
        </>
    );
}

export default ChattingArea;
