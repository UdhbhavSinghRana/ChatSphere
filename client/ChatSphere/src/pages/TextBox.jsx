import React from 'react';
import MessageSend from './MessageSend';
import MessageReceive from './MessageRecive';
import SendMessage from './SendMessage';

function TextBox() {
  return (
    <div className='flex flex-col '>
        <div className='flex items-center p-4'>
            <MessageReceive />
        </div>
        <div className='flex items-center justify-end p-4'>
            <MessageSend />
        </div>
        <div className='w-full bottom-0'>
            <SendMessage />
        </div>
    </div>
  );
}

export default TextBox;
