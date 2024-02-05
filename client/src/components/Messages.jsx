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
        <div className='flex-grow overflow-y-auto p-3'>
            <div className='flex flex-col gap-3' ref={messageLogsRef}>
                {messages.map((message, index) => (
                    <div key={index} className='border border-pink-500 rounded-3xl px-3 py-2 w-fit text-white'>{message}</div>
                ))}
            </div>
        </div>
    )
}

export default Messages;
