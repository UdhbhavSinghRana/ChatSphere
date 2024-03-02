import axios from "axios";
import { useEffect, useState } from "react";

const Sidenav = () => {
    const [Friend, setFriend] = useState([]);

    const getToken = () => {
        // Implement this function according to your authentication mechanism
        console.log(localStorage.getItem("userInfo"));
        const userInfoString = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(userInfoString);
        const token = userInfo.token;
        return token;
    };

    const getFriendData = async () => {
        try {
            // Assuming you have a function to get the JWT token from wherever it's stored
            const token = getToken(); // Implement this function according to your authentication mechanism
    
            const { data } = await axios.get("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            
            console.log(data);
            setFriend(data);
            return data;
        } catch (err) {
            console.log(err);
        }
    };    
    useEffect(() => {
        getFriendData();
    }, []);
    return (
        <div className='flex flex-col h-full w-1/4 bg-[#21374f]'>
            <div className='flex items-center text-white min-h-16 px-5 shadow-lg'>
                ChatSphere
            </div>
            {Friend.map((friend, index) => (
                <div key={index} className='flex items-center text-white min-h-16 px-5 shadow-lg'>
                    {friend.name}
                </div>
            ))}
        </div>
    );
}

export default Sidenav;
