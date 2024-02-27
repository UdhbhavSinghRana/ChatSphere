import User from '../models/users.mjs';
import generateToken from '../config/generateToken.mjs';

const registerUser = async (req, res) => {

    const {name, password, email} = req.body;
    if (!name || !email || !password) {
        res.status(400).json({message: "Please fill all the fields"});
    }

    const userExist = await User.findOne({email : email});

    if (userExist) {
        res.status(400).json({message: "User already exists"});
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        console.log(user);
        await user.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

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