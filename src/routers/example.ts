import express from "express";
import controller from "../Controllers/example";
import {getToken} from "../middlewares/authMiddleware";

const router = express.Router();

router.get('/example',getToken(),controller.example)

export = router;
