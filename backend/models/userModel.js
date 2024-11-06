import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },
}, {
    timestamps: true,
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
