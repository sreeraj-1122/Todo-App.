import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '../models/userModel.js';

// Login user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token, message: "Login successful", data: user });
    } catch (error) {
        next(error);
    }
};

// Create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

// Register user
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password ) {
            return res.status(400).json({ success: false, message: "Please provide all required fields." });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
       
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.cookie('token', token, { httpOnly: true, secure: true });
        return res.status(201).json({ success: true, token, message: "Registration successful" });
    } catch (error) {
        next(error);
    }
};

export { loginUser, registerUser };
