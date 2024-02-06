import Sidenav from '../components/Sidenav';
import ChattingArea from '../components/ChattingArea';

const Home = () => {
    return (
        <div className="flex h-full bg-[#152639]">
            <Sidenav />
            <ChattingArea />
        </div>
    )
}

export default Home;
