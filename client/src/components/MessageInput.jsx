import { useContext, useState } from "react";
import socket from "../socket";
import { ChatContext } from "../context/ChatProvider";
import axios from "axios";

const MessageInput = ({ onSendMessage }) => {
    const [inputMessage, setInputMessage] = useState('');
    const { selectedChat } = useContext(ChatContext);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (inputMessage.length === 0) return;
        

        const config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`,
            },
        };

        const { data } = await axios.post("http://localhost:3000/api/message", {
            chatId: selectedChat._id,
            content: inputMessage,
        }, config);

        
        socket.emit('send-message', inputMessage);
        onSendMessage(inputMessage);
        setInputMessage('');
    }

    return (
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
    );
}

export default MessageInput;
