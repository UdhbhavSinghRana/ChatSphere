import axios from 'axios';
import React from 'react'

export const Users = ({user}) => {
    console.log(user._id);  
    const fetchChat = async() => {
        const {data} = await axios.post('http://localhost:3000/api/chat', {
            users: user._id
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
            }
        });

        console.log(data);
    }

    return (
        <>
            <div className='flex items-center text-white min-h-16 px-5 shadow-sm hover:bg-[#1d2c3b]' onClick={fetchChat}>
                {user.name}
            </div>
        </>
    )
}
