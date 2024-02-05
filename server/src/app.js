import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", socket => {
    console.log(`${socket.id} connected`);

    socket.on("send-message", message => {
        console.log(message);
        socket.broadcast.emit("receive-message", message);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    })
});

app.get('/health', (_req, res) => {
    res.send({ health: 'OK' })
})

server.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
