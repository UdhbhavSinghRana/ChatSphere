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

export {registerUser, authUser};