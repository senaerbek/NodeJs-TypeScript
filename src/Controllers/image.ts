import express, {NextFunction, Request, Response} from 'express';
import fetch from 'node-fetch';
const router = express.Router();
import fs from 'fs';
import multer from 'multer'

router.post("/uploadBase64", (req: Request, res: Response, next: NextFunction) => {
    try {
        const folder = __dirname + '\\image/'
        const path = folder + Date.now() + '.png'
        const imgData = req.body.base64image;
        fs.writeFileSync(path, imgData);
        return res.send(path);
    } catch (e) {
        next(e);
    }
})

router.get("/getBase64/:filename", (req: Request, res: Response) => {
    const folder = __dirname + '\\image/'
    const bitmap = fs.readFileSync(`${folder}${req.params.filename}.png`);
    const image = new Buffer(bitmap).toString('base64');
    res.json({
        data: "data:image/png;base64," + image
    });
})

router.post("/uploadUrl", async (req: Request, res: Response, next: NextFunction) => {
    const img = req.body.imageUrl
    let base64file = await fetch(img).then((r: any) => r.buffer()).then((buf: any) => `data:image/${'png'};base64,` + buf.toString('base64'));
    const folder = __dirname + '\\image/'
    const path = folder + Date.now() + '.png'

    fs.writeFileSync(path, base64file.replace(/^data:([A-Za-z-+/]+);base64,/, ''), {encoding: 'base64'});
    res.json({
        data: base64file
    })
})

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, __dirname + '\\image/')
    },
    filename: function (req: any, file: any, cb: any) {
        const {originalname} = file;
        cb(null, originalname)
    }
})

interface MulterRequest extends Request {
    file: any;
}

const upload = multer({storage})

router.post("/uploadFile", upload.single('base64image'), (req: Request, res: Response) => {
    const content = fs.readFileSync((req as MulterRequest).file.path, {encoding: 'base64'});
    res.json({
        data: `data:image/${'png'};base64,${content}`
    });
})

module.exports = router
