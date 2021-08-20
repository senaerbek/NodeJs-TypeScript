import express from "express";
import example from "./src/routers/example";
import user from "./src/routers/user";
import image from "./src/routers/image";
import * as dotenv from 'dotenv'
import {connectionDatabase}  from "./src/helper/databaseConnection";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
connectionDatabase();
dotenv.config({
    path: './src/.env'
});

const PORT = process.env.PORT
app.use('/api', example);
app.use('/api', user);
app.use('/api', image);

app.listen(PORT, () => {
    console.log('listen', PORT);
})
