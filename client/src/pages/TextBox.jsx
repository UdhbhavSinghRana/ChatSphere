import React, { useState, useRef, useEffect } from 'react';
import MessageSend from './MessageSend';
import MessageReceive from './MessageRecive';
import SendMessage from './SendMessage';
import { io } from "socket.io-client";

function TextBox() {
  const socket = io("http://localhost:3000");
  const messageLogRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [receiveMessages, setReceiveMessages] = useState([]);

  useEffect(() => {
    messageLogRef.current.scrollIntoView({ behavior: "smooth" });
  }
  ,[messages]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
    socket.emit("send-message", message);
  }

  socket.on("receive-message", (message) => {
    setReceiveMessages([...receiveMessages, message]);
  });
  
  return (
    <div className='flex flex-col h-full overflow-scroll'>
        <div className='flex flex-col items-start justify-center p-4'>
            {receiveMessages.map((message, index) => (
              <MessageReceive key={index} value={message} />
            ))}
        </div>
        <div className='flex flex-col justify-center items-end p-4 mb-12 '>
            {messages.map((message, index) => (
              <MessageSend key={index} value={message} />
            ))}
        </div>
        <div className='w-full bottom-0 h-full justify-end' ref={messageLogRef}>
            <SendMessage onSendMessage={handleSendMessage}/>
        </div>
    </div>
  );
}

export default TextBox;
