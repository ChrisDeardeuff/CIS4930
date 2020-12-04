import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import file from 'fs';
import path from 'path';
import { usersRouter } from './routes/userRouter';
import {postRouter} from "./routes/postRouter";
import {categoryRouter} from "./routes/categoryRouter";
import {postCategoryRouter} from "./routes/postCategoryRouter";
import cookieParser from "cookie-parser";

let app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(usersRouter);
app.use(postRouter);
app.use(categoryRouter);
app.use(postCategoryRouter);
app.use('/',(req,res,next)=>
{
    console.log(process.cwd());
    res.sendFile(path.join(process.cwd(),'public/views/index.html'));
});

let server = http.createServer(app);
server.listen(3000);