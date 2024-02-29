import expressAsyncHandler from "express-async-handler";
import Chat from "../models/chatModel.mjs";
import User from "../models/users.mjs";

const accessChat = expressAsyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: {$elemMatch: { $eq: userId }}},
            { users: {$elemMatch: { $eq: req.user._id }}}
        ],
    }).populate("users", "-password")
        .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name, email" 
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);
        }
        else {
            var charData = {
                chatName: "sender",
                isGroupChat: false,
                users: [userId, req.user._id],
            };
            try {
                const createdChat = await Chat.create(charData);

                const FullChat = await Chat.findById(createdChat._id).populate("users", "-password")

                res.status(200).send(FullChat);
            }
            catch (err) {
                res.status(400).json({ message: "Invalid chat data" });
            }
        }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
    try {

        const chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id }} })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (chats) => {
            const fullChat = await User.populate(chats, {
                path: "latestMessage.sender",
                select: "name, email"
            });

            res.status(200).send(fullChat);
        });
    }
    catch (err) {
        res.status(400).json({ message: "Invalid chat data" });
    }
});

export { accessChat, fetchChat };