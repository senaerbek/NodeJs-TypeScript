import express from "express";

const imageController = require('../Controllers/image')

const router = express.Router();

router.use('/image', imageController);

export = router;
