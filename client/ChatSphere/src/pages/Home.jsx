import React from 'react'
import Sidenav from './Sidenav';
import MessageSend from './MessageSend';
import TextBox from './TextBox';
import MessageReceive from './MessageRecive';
function Home() {
    document.getElementById('root').className="h-screen"
    return (
        <>
            <div className="container flex h-full bg-[#152639]">
                <Sidenav />
                <div className='h-full w-full'>
                    <TextBox />
                </div>
            </div>
        </>
    )
}

export default Home;
