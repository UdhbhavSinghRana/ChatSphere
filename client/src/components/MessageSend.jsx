import React from 'react'

function MessageSend({ value }) {
    return (
        <div className=' h-full border-2 mb-2 border-slate-400 text-slate-50 p-2 rounded-md bg-blue-600 justify-center inline-block'>
            {value}
        </div>
    )
}

export default MessageSend
