import express from 'express';
import {Post,arrayOfPosts} from '../Post';
import {User,arrayOfUsers} from "../User";
import {Category, arrayOfCategories} from "../Category";
import {PostCategory, arrayOfPostCategories} from "../PostCategory";
import path from "path";
import jwt from "jsonwebtoken";

const postCategoryRouter = express.Router();

postCategoryRouter.get('/PostCategories/:postID',(req, res)=>{
    let tempArray:PostCategory[] = []

    for (let i = 0; i < arrayOfPostCategories.length; i++) {
        if(arrayOfPostCategories[i].postID == req.params.postID){
            tempArray.push(arrayOfPostCategories[i]);
        }
    }
    res.json(tempArray);
});

postCategoryRouter.get('/PostCategories/Posts/:categoryID',(req, res)=>{
    let tempArray:PostCategory[] = [];
    let tempArray2:Post[] = [];

    for (let i = 0; i < arrayOfPostCategories.length; i++) {
        if(arrayOfPostCategories[i].categoryID == req.params.categoryID){
            tempArray.push(arrayOfPostCategories[i]);

        }
    }
    for (let j = 0; j < tempArray.length; j++) {
        for (let i = 0; i < arrayOfPosts.length; i++) {
            if(tempArray[j].postID == arrayOfPosts[i].postID){
                tempArray2.push(arrayOfPosts[i]);
            }
        }
    }
    res.json(tempArray2);
});

postCategoryRouter.post('/PostCategories/:postID/:categoryID',(req, res)=>{
    if(!req.cookies.loggedIn || jwt.verify(req.cookies.loggedIn,'1234567890')){

        let newPostCategory:PostCategory = new PostCategory(req.params.categoryID,req.params.postID);
        for (let i = 0; i < arrayOfCategories.length; i++) {
            if(arrayOfCategories[i].categoryID == req.params.categoryID){
                for (let j = 0; j < arrayOfPosts.length; j++) {
                    if(arrayOfPosts[i].postID == req.params.postID){
                        arrayOfPostCategories.push(newPostCategory);
                        return;
                    }
                }
            }
        }
        res.json('{"Status”: 404, “Message”: “Post or Category ID not found!"}');
    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});

postCategoryRouter.delete('/PostCategories/:postID/:categoryID',(req, res)=>{

    if(!req.cookies.loggedIn || jwt.verify(req.cookies.loggedIn,'1234567890')){

        let newPostCategory:PostCategory = new PostCategory(req.params.categoryID,req.params.postID);
        for (let i = 0; i < arrayOfCategories.length; i++) {
            if(arrayOfCategories[i].categoryID == req.params.categoryID){
                for (let j = 0; j < arrayOfPosts.length; j++) {
                    if(arrayOfPosts[i].postID == req.params.postID){
                        arrayOfPostCategories.splice(i,i);
                        return;
                    }
                }
            }
        }
        res.json('{"Status”: 404, “Message”: “Post or Category ID not found!"}');
    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }

});
export {postCategoryRouter};
