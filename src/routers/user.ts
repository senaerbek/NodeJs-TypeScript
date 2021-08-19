import express from "express";

const userController = require('../Controllers/user')
const router = express.Router();

router.use('/user', userController);
export = router;
