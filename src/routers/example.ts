import express from "express";
import controller from "../Controllers/example";

const router = express.Router();
router.get('/example',controller.example)

export = router;
