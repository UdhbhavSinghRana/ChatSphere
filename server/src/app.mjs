import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRouter from './routes/userRouter.mjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors middleware
import User from './models/users.mjs';
import { notFound, errorHandler } from '../src/middleware/errorHandler.mjs';
import chatRouter from './routes/chatRouter.mjs';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI; 
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);



const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });  

io.on("connection", socket => {
    console.log(`${socket.id} connected`);

    socket.on("send-message", message => {
        socket.broadcast.emit("receive-message", message);
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    })
});

app.get('/health', (_req, res) => {
    res.send({ health: 'OK' })
})


//app.use(notFound);
app.use(errorHandler);

// Mongoose connection

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the Express.js server
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if MongoDB connection fails
    });
