import User from '../models/users.mjs';
import generateToken from '../config/generateToken.mjs';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from "bcrypt";

const registerUser = expressAsyncHandler (async (req, res) => {

    const {name, password, email} = req.body;
    if (!name || !email || !password) {
        res.status(400).json({message: "Please fill all the fields"});
    }

    const userExist = await User.findOne({email : email});

    if (userExist) {
        res.status(400).json({message: "User already exists"});
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user =new User({
            name: req.body.name,
            email: req.body.email,
            password : hashedPassword
        });
        await user.save();
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        });
    }
    catch (err){
        console.log(err);
        res.status(400).json({message: "Invalid user data"});
    }
});

const authUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user && (await user.matchPassword(password))) {
        res.json ({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        });
    }
}

const allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            {
                name: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            },
            {
                email: {
                    $regex: req.query.search,
                    $options: 'i'
                }
            }
        ],
        _id: { $ne: req.user._id } // Exclude the currently logged-in user
    } : { _id: { $ne: req.user._id } }; // If no search query, still exclude the currently logged-in user

    try {
        const users = await User.find(keyword);
        res.send(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
}



export {registerUser, authUser, allUsers};