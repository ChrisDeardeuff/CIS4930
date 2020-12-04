import express from 'express';
import {Post,arrayOfPosts} from '../Post';
import {User,arrayOfUsers} from "../User";
import {Category, arrayOfCategories} from "../Category";
import {PostCategory, arrayOfPostCategories} from "../PostCategory";
import {Comment,arrayOfComments} from "../Comment";
import path from "path";


const commentRouter = express.Router();

commentRouter.get('/Comments/:postID',(req, res)=>{

});

commentRouter.post('/Comments/:postID',(req, res)=>{

});
commentRouter.patch('/Comments/:postID/:commentID',(req, res)=>{

});
commentRouter.delete('/Comments/:postID/:commentID',(req, res)=>{

});
commentRouter.get('/Comments/:postID/:commentID',(req, res)=>{

});
export {commentRouter};