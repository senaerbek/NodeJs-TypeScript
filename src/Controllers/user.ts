import express, {Request, Response} from "express";
import User from "../models/user";
import {sendJwt} from "../helper/auth"
import {IUser} from "../interface/IUser";
import bcrypt from 'bcrypt'
import {body, validationResult} from "express-validator";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getById);
router.delete("/:id", deleteUser);
router.post("/login",
    body('email').isEmail(),
    body('password').isLength({min: 5}), login);
router.post("/register",
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 5}), register);

async function register(req: Request, res: Response) {
    const {name, password, email} = req.body;
    const user: IUser = new User({
        name,
        password,
        email
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const userControl = await User.findOne({email});
    return user.save()
        .then(result => {
            return res.status(201).json({
                status: true,
                data: {
                    name: result.name,
                    email: result.email
                }
            })
        })
        .catch(error => {
            if (userControl) {
                return res.status(409).json({
                    status: false,
                    message: "User already exist"
                })
            }
            return res.status(400).json({
                status: false,
                message: error.message
            })
        })
}

async function login(req: Request, res: Response) {
    const {email, password} = req.body;
    const user: IUser = <IUser>await User.findOne({email}).select("+password").exec();
    if (!user) {
        res.status(404).json({
            success: false,
            data: 'User not found'
        })
    }
    if (bcrypt.compareSync(password, user.password)) {
        sendJwt(user, res);
    } else {
        res.status(400).json({
            success: false,
            data: 'Email or Password is incorrect'
        })
    }
}

function getUsers(req: Request, res: Response) {
    User.find().exec()
        .then(results => {
                return res.status(200).json({
                    status: true,
                    data: results,
                    count: results.length
                })
            }
        ).catch(error => {
        return res.status(400).json({
            status: false,
            message: error.message
        })
    })
}

async function getById(req: Request, res: Response) {
    const user = await User.findById(req.params.id);
    if (user) {
        return res.status(200).json({
            status: true,
            data: user
        })
    } else {
        return res.status(404).json({
            status: false,
            message: 'User Not Found'
        })
    }
}

async function deleteUser(req: Request, res: Response) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
        return res.status(200).json({
            status: true,
            data: "success"
        })
    } else {
        return res.status(404).json({
            status: false,
            message: 'User Not Found'
        })
    }
}

module.exports = router
