import express from "express";
import example from "./src/routers/example";
import user from "./src/routers/user";
import image from "./src/routers/image";
import * as dotenv from 'dotenv'


require('./src/helper/databaseConnection')();

const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded());

dotenv.config({
    path: './src/.env'
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
const PORT = process.env.PORT
app.use('/api', example);
app.use('/api', user);
app.use('/api', image);

app.listen(PORT, () => {
    console.log('listen', PORT);
})
