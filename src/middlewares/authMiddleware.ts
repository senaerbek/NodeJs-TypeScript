import {NextFunction, Response} from "express";
import jwt, {JwtPayload} from 'jsonwebtoken';

const getToken = (req: { headers: { authorization: string; }; user: { id: any; name: string; }; }, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const accessToken = req.headers.authorization.split(" ")[1];
        jwt.verify(accessToken, "JWT_SECRET_KEY_JWT_SECRET_KEY", (
            err, decoded:JwtPayload|undefined
        ) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    res.status(401).json({
                        success: false,
                        data: 'Please Login Again'
                    })
                }
            }
            req.user = {
                id: decoded?.id,
                name: decoded?.name,
            }
        });
    } else {
        res.status(401).json({
            success: false,
            data: 'Unauthorized'
        })
    }
    next();
}
module.exports = {getToken}
