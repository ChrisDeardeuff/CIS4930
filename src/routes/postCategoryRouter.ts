import express from 'express';
import {Post,arrayOfPosts} from '../Post';
import {User,arrayOfUsers} from "../User";
import {Category, arrayOfCategories} from "../Category";
import {PostCategory, arrayOfPostCategories} from "../PostCategory";
import path from "path";

const postCategoryRouter = express.Router();

postCategoryRouter.get('/PostCategories',(req, res)=>{
    res.json(arrayOfPostCategories).status(200);
});

postCategoryRouter.get('/PostCategories/Posts/:categoryID',(req, res)=>{

});

postCategoryRouter.post('/PostCategories/:postID/:categoryID',(req, res)=>{

});

postCategoryRouter.delete('/PostCategories/:postID/:categoryID',(req, res)=>{

});
export {postCategoryRouter};