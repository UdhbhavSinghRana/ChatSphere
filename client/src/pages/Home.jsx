import Sidenav from '../components/Sidenav';
import ChattingArea from '../components/ChattingArea';
import SignIn from '../components/SignIn';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        
        if(!user) navigate('/signin');
    }, [])
    return (
        <>
        <div className="flex h-full bg-[#152639]">
            <Sidenav />
            <ChattingArea />
        </div>
        </>
        
    )
}

export default Home;
