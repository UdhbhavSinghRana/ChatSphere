import { io } from "socket.io-client";


const BASE_URL = import.meta.env.PROD
    ? 'https://chatsphere-yuu4.onrender.com'
    : 'http://localhost:3000';

const socket = io(BASE_URL, {
    autoConnect: false
})

export default socket;
