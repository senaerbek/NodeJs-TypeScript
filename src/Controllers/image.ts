import express, {NextFunction, Request, Response} from "express";

const fetch = require("node-fetch");
const router = express.Router();
const fs = require('fs');

router.post("/uploadBase64", (req: Request, res: Response, next: NextFunction) => {
    try {
        const folder = __dirname+'\\image/'
        const path = folder + Date.now() + '.png'
        const imgData = req.body.base64image;
        const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path, base64Data, {encoding: 'base64'});
        return res.send(path);
    } catch (e) {
        next(e);
    }
})

router.get("/uploadBase64/:filename", (req: Request, res: Response) => {
    const folder = __dirname+'\\image/'
    const bitmap = fs.readFileSync(`${folder}${req.params.filename}.png`);
    const a = new Buffer(bitmap).toString('base64');
    res.json({
        data: "data:image/png;base64," + a
    });
})

router.post("/uploadUrl", async (req: Request, res: Response, next: NextFunction) => {
    const img = req.body.imageUrl

    let base64file = await fetch(img).then((r:any) => r.buffer()).then((buf:any) => `data:image/${'png'};base64,` + buf.toString('base64'));
    const folder = __dirname+'\\image/'
    const path = folder + Date.now() + '.png'

    fs.writeFileSync(path, base64file.replace(/^data:([A-Za-z-+/]+);base64,/, ''), {encoding: 'base64'});
    res.json({
        data: base64file
    })
})

module.exports = router
