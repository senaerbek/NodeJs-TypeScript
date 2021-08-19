import {Response} from "express";
import {IUser} from "../interface/IUser";
import {generateJwtFromUser} from "./generateJwt";

export const sendJwt = (user: IUser, res: Response) => {
    const token = generateJwtFromUser(user);
    return res.status(200).cookie("access_token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + 10 * 1000000),
        secure: false,
    }).json({
        success: true,
        access_token: token,
        data: {
            name: user.name,
            email: user.email
        }
    });
}

