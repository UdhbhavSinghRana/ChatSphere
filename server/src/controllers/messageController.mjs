import expressAsyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.mjs';
import User from '../models/users.mjs';
import message from '../models/message.mjs';

const allChats = expressAsyncHandler(async (req, res) => {
    try {
        const chats = await Chat.find({chat : req.params.chatId})
            .populate("sender", "name pic email")
            .populate("chat");
        res.status(200).send(chats);
    }
    catch (err) {
        res.status(400).json({ message: "Invalid chat data" });
    }
});

export { allChats };