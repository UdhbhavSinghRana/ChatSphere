import { useRef, useEffect } from "react";
import { ChatState } from "../context/ChatProvider";

const Messages = ({ messages }) => {
    const messageLogsRef = useRef(null);
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    useEffect(() => {
        messageLogsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }, [messages])

    return (
        <div className='flex-grow overflow-y-auto px-4 pt-4 pb-1'>
            <div className='flex flex-col' ref={messageLogsRef}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`
                            h-full w-fit mb-2 text-slate-50 px-3 py-2 rounded-full justify-center inline-block'>
                            ${message.sender === user ? 'bg-blue-600 self-end' : 'bg-gray-600'}
                        `}
                    >{message.content}</div>
                ))}
            </div>
        </div>
    )
}

export default Messages;
