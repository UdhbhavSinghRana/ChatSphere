import React from 'react';

function MessageReceive({ value}) {
  return (
    <div className='h-full border-2 pb-2 mb-2 border-slate-400 text-slate-50 p-2 rounded-md bg-gray-600 justify-center inline-block'>
        {value}
    </div>
  );
}

export default MessageReceive;
