import React, { useState } from 'react';
import MessageSend from './MessageSend';
import MessageReceive from './MessageRecive';
import SendMessage from './SendMessage';
function TextBox() {
  const [messages, setMessages] = useState([]);
  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
    console.log(message);
  }
  return (
    <div className='flex flex-col h-full overflow-scroll'>
        <div className='flex flex-col items-start justify-center p-4'>
            <MessageReceive />
            <MessageReceive />
            <MessageReceive />
            <MessageReceive />
            <MessageReceive />
            <MessageReceive />
            <MessageReceive />
            <MessageReceive />
            <MessageReceive />
            <MessageReceive />

            
        </div>
        <div className='flex flex-col justify-center items-end p-4 mb-12 '>
            {messages.map((message, index) => (
              <MessageSend key={index} value={message} />
            ))}
        </div>
        <div className='w-full bottom-0 h-full justify-end'>
            <SendMessage onSendMessage={handleSendMessage}/>
        </div>
    </div>
  );
}

export default TextBox;
