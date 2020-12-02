import express from 'express';
import {Post} from '../Post';
import path from "path";
import{arrayOfPosts} from '../Post'

const postRouter = express.Router();

postRouter.get('/Posts',(req,res)=>{

});

postRouter.get("/Posts/:postID",(req,res)=>{

});

postRouter.post('/Posts',(req,res)=>{


});

postRouter.patch('/Posts/:postID',(req,res)=> {


});

postRouter.delete('/Posts/:postID',(req,res)=> {


});

export {postRouter};
