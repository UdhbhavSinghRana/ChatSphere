import axios from 'axios';
import { useContext } from 'react'
import socket from '../socket';
import { ChatContext } from '../context/ChatProvider';

const UserChat = ({ userReciever }) => {
    const userRecieverId = userReciever._id;
    const { selectedChat, setSelectedChat, user, setChats } = useContext(ChatContext);
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("http://localhost:3000/api/chat", config);
            setChats(data);
            setSelectedChat(data.find((chat) => chat.users.find((user) => user._id === userRecieverId)));

            socket.emit('join-room', selectedChat._id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='flex items-center text-white min-h-16 px-5 shadow-sm hover:bg-[#1d2c3b]' onClick={() => fetchChats()}>
                {userReciever.name}
            </div>
        </>
    )
}

export default UserChat;
