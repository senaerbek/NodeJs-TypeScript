import {IUser} from "../interface/IUser";
import jwt from 'jsonwebtoken'

export function generateJwtFromUser(user: IUser) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email
    };
    return jwt.sign(payload, "JWT_SECRET_KEY_JWT_SECRET_KEY", {
        expiresIn: 100
    });
}
