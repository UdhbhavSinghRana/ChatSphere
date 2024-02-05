import { useRef, useEffect } from "react";

const Messages = ({ messages }) => {
    const messageLogsRef = useRef(null);

    useEffect(() => {
        messageLogsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }, [messages])

    return (
        <div className='border border-blue-500 flex-grow overflow-y-auto p-3'>
            <div className='border border-red-500 flex flex-col gap-3' ref={messageLogsRef}>
                {messages.map((message, index) => (
                    <div key={index} className='border border-pink-500 ronded-3/4 px-2 py-1 text-white'>{message}</div>
                ))}
            </div>
        </div>
    )
}

export default Messages;
