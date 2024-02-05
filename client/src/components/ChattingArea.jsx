import { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import socket from "../socket";

const ChattingArea = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true)
        }

        const onDisconnect = () => {
            setIsConnected(false)
        }

        const onReceiveMessage = (message) => {
            setMessages(prevMessage => {
                return [...prevMessage, message]
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

    const handleSendMessage = (message) => {
        socket.emit('send-message', message);
    }

    return (
        <>
            {isConnected && (
                <div className='flex flex-col w-full'>
                    <div className='flex items-center text-white min-h-16 px-5 shadow-lg'>
                        {/* TODO: Here goes the username of person you are talking to*/}
                        Testing User
                    </div>
                    <Messages messages={messages} />
                    <MessageInput onSendMessage={handleSendMessage} />
                </div>
            )}
        </>
    );
}

export default ChattingArea;
