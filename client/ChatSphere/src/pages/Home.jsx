import React from 'react'
import Sidenav from './Sidenav';
import MessageSend from './MessageSend';
import TextBox from './TextBox';
function Home() {
    document.getElementById('root').className="h-screen"
    return (
        <>
            <div className="container flex h-full bg-[#152639]">
                <Sidenav />
                <div className='absolute bottom-24 right-10'>
                    <MessageSend /> 
                </div>
            </div>
        </>
    )
}

export default Home;
