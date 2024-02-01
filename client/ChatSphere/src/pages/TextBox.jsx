import React from 'react';
import MessageSend from './MessageSend';
import MessageReceive from './MessageRecive';
import SendMessage from './SendMessage';

function TextBox() {
  return (
    <div className='flex flex-col h-full overflow-scroll'>
        <div className='flex flex-col items-start justify-center  p-4'>
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
        <div className='flex flex-col justify-center items-end p-4'>
            <MessageSend />
            <MessageSend />
            <MessageSend />
            <MessageSend />
            <MessageSend />
            <MessageSend />

        </div>
        <div className='w-full bottom-0 h-full border-2 justify-end'>

            <SendMessage />
        </div>
    </div>
  );
}

export default TextBox;
