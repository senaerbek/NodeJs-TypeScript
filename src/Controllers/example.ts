import {Request, Response} from "express";

const example = (req: Request, res: Response) => {
    res.send('example');
}

export default {example}
