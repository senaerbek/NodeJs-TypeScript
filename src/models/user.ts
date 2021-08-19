import {IUser} from "../interface/IUser";
import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'please try a different email'],
        match: [
            /^[^\W_]+[\.\-\\\'\+\&_]?[^\W_]+@[^\W_]+[\-\&\\\'_]?[^\W_]+\.[^\W_]{2,}(?:\.[^\W_]{2})?$/,
            'please provide a valid email'
        ]
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        select: false
    },
})

userSchema.pre("save", async function (this: IUser, next) {
    if (this.password) {
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hashSync(this.password, salt);
    }
    next();
})

export default mongoose.model<IUser>('User', userSchema);
