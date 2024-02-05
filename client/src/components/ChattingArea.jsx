import SendMessage from "./SendMessage";

function ChattingArea() {
    // const messageLogRef = useRef(null);
    // const [messages, setMessages] = useState([]);
    // const [receiveMessages, setReceiveMessages] = useState([]);

    // useEffect(() => {
    //     messageLogRef.current.scrollIntoView({ behavior: "smooth" });
    // }, [messages]);

    // const handleSendMessage = (message) => {
    //     setMessages([...messages, message]);
    //     socket.emit("send-message", message);
    // }

    // socket.on("receive-message", (message) => {
    //     setReceiveMessages([...receiveMessages, message]);
    // });

    return (
        <div className='flex flex-col w-full'>
            <div className='flex items-center text-white min-h-16 px-5 shadow-lg'>
                {/* TODO: Here goes the username of person you are talking to*/}
                Testing User
            </div>
            <div className='flex-grow'>Testing</div>
            <SendMessage />
        </div>
    );
}

export default ChattingArea;
