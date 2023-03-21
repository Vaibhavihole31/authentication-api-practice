import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please enter your fullname'],
        },
        email: {
            type: String,
            required: [true, 'please enter your email'],
        },
        password: {
            type: String,
            required: [true, 'please enter your password'],
        },
        tc: { type: Boolean, required: true},
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;