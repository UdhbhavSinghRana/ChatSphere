import { useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const ChattingArea = () => {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (message) => {
        {/* TODO: sending of message through socket event */ }
        setMessages(prevMessages => [...prevMessages, message]);
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex items-center text-white min-h-16 px-5 shadow-lg'>
                {/* TODO: Here goes the username of person you are talking to*/}
                Testing User
            </div>
            <Messages messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
}

export default ChattingArea;
