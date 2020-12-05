import express from 'express';
import {Post,arrayOfPosts} from '../Post';
import {User,arrayOfUsers} from "../User";
import {Category, arrayOfCategories} from "../Category";
import {PostCategory, arrayOfPostCategories} from "../PostCategory";
import {Comment,arrayOfComments} from "../Comment";
import path from "path";
import jwt from "jsonwebtoken";


const commentRouter = express.Router();

commentRouter.get('/Comments/:postID',(req, res)=>{
    var tempArray:Comment[] = [];
    for (let i = 0; i < arrayOfComments.length; i++) {
        if(arrayOfComments[i].postID == req.params.postID){
            tempArray.push(arrayOfComments[i]);
        }
    }
    res.json(tempArray);
});

commentRouter.post('/Comments/:postID',(req, res)=>{
    if(req.cookies.loggedIn){
        try{
            let token = jwt.verify(req.cookies.loggedIn,'1234567890')
            var decoded = jwt.verify(req.cookies.loggedIn, '1234567890');

            // @ts-ignore
            let userID = decoded.id;

            var comment:Comment = new Comment(arrayOfComments.length,req.body.comment,req.cookies.id,req.params.postID,new Date());
            for (let i = 0; i < arrayOfPosts.length; i++) {
                if(arrayOfPosts[i].postID == comment.postID){
                    arrayOfComments.push(comment);
                    res.json('{"Status”: 200, “Message”: "Comment Posted!"}');
                    return;
                }
            }

        }catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }

        res.json('{"Status”: 404, “Message”: "Post Not Found!"}');
    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
commentRouter.patch('/Comments/:postID/:commentID',(req, res)=>{

    if(req.cookies.loggedIn){
        try{
            let token = jwt.verify(req.cookies.loggedIn,'1234567890')
            var decoded = jwt.verify(req.cookies.loggedIn, '1234567890');

            // @ts-ignore
            let userID = decoded.id;

            for (let i = 0; i < arrayOfComments.length; i++) {
                if(arrayOfComments[i].commentID == parseInt(req.params.commentID) && arrayOfComments[i].postID == req.params.postID){
                    arrayOfComments[i].comment = req.body.comment;
                    res.json('{"Status”: 200, “Message”: "Comment Patched"}');
                    return;
                }
            }
            res.json('{"Status”: 404, “Message”: "Post or Comment Not Found!"}');
        }catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }

    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
commentRouter.delete('/Comments/:postID/:commentID',(req, res)=>{

    if(req.cookies.loggedIn){
        try{
            for (let i = 0; i <arrayOfComments.length; i++) {
                if(arrayOfComments[i].commentID == parseInt(req.params.commentID) && arrayOfComments[i].postID == req.params.postID && req.cookies.id == arrayOfComments[i].userId){
                    arrayOfComments.splice(i,i);
                    res.json('{"Status”: 200, “Message”: "Comment Deleted!"}');
                    return;
                }
            }
            res.json('{"Status”: 404, “Message”: "Post or Comment Not Found (or you are not author)!"}');
        }catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }

    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
commentRouter.get('/Comments/:postID/:commentID',(req, res)=>{
    for (let i = 0; i <arrayOfComments.length; i++) {
        if(arrayOfComments[i].commentID == parseInt(req.params.commentID) && arrayOfComments[i].postID == req.params.postID){
            res.json(arrayOfComments[i]);
            return;
        }
    }
    res.json('{"Status”: 404, “Message”: "Post or Comment Not Found!"}');
});
export {commentRouter};
