import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import file from 'fs';
import { usersRouter } from './routes/userRouter';
import path from 'path';

let app = express();

app.use(bodyParser.urlencoded({ extended: false}));

app.use(usersRouter);

app.use('/',(req,res,next)=>
{
    console.log(process.cwd());
    res.sendFile(path.join(process.cwd(),'public/views/index.html'));
});

let server = http.createServer(app);
server.listen(3000);