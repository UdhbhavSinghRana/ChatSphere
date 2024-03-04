import axios from "axios";
import { useEffect, useState } from "react";

const Sidenav = () => {
    const [friendArr, setFriendArr] = useState([]);

    const getFriendData = async () => {
        try {
            const currId = JSON.parse(localStorage.getItem("userInfo"))._id;
            const {data} = await axios.get(`http://localhost:3000/api/users/${currId}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
                }
            
            });
            const friendPromises = data.friends.map(async (friend) => {
                const { data } = await axios.get(`http://localhost:3000/api/users/${friend}`, {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
                    }
                });
                return data;
            });
            const friendData = await Promise.all(friendPromises);
            setFriendArr(friendData);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getFriendData();
    }, []);
    return (
        <div className='flex flex-col h-full w-1/4 bg-[#21374f]'>
            <div className='flex items-center text-white min-h-16 px-5 shadow-xl'>
                ChatSphere
            </div>
            {friendArr.map((friend, index) => (
                <div key={index} className='flex items-center text-white min-h-16 px-5 shadow-sm'>
                    {friend.name}
                </div>
            ))}
        </div>
    );
}

export default Sidenav;
