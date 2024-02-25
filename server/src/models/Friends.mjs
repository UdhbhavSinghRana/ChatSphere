import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    friends: {
        type: Array,
        required: true,
    },
});