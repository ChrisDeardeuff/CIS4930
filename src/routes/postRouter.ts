import express from 'express';
import {Post,arrayOfPosts} from '../Post';
import path from "path";
import jwt from "jsonwebtoken";
import {User} from "../User";

const postRouter = express.Router();

//arrayOfPosts.push(new Post("1", new Date().setTime(230020),"Test Post1","JUST A TEST","kristoff","",new Date()));
//arrayOfPosts.push(new Post("12", new Date().setTime(-120103),"Test Post2","JUST A TEST","kristoff","",new Date()));
//arrayOfPosts.push(new Post("33", new Date().setTime(5),"Test Post3","JUST A TEST","kristoff","",new Date()));

postRouter.get('/Posts',(req,res)=>{

    arrayOfPosts.sort(function(a, b){return a.createdDate - b.createdDate;});

    res.json(arrayOfPosts).status(200)
});

postRouter.get("/Posts/:postID",(req,res)=>{

    for (let i = 0; i < arrayOfPosts.length; i++){
        if(arrayOfPosts[i].postID == req.params.postID){
            res.json(arrayOfPosts[i]).status(200);
        }
    }
    res.json('{"Status”: 404, “Message”: “Post Not Found!"}');
});

postRouter.post('/Posts',(req,res)=>{


    if(req.cookies.loggedIn){
        try{
            let token = jwt.verify(req.cookies.loggedIn,'1234567890')
            var decoded = jwt.verify(req.cookies.loggedIn, '1234567890');

            // @ts-ignore
            let userID = decoded.id;

            arrayOfPosts.push(new Post(String(arrayOfPosts.length),new Date().getDate(),req.body.title,req.body.content,userID,req.body.headerImage,new Date()));
            res.json('{"Status”: 200, “Message”: “Post Posted!"}');

        }catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }
    }else{
        res.json('{"Status”: 401, “Message”: “User not authorized!"}');
    }

});

postRouter.patch('/Posts/:postID',(req,res)=> {

    if(!req.cookies.loggedIn || jwt.verify(req.cookies.loggedIn,'1234567890')){

        for (let i = 0; i < arrayOfPosts.length; i++){
            if(arrayOfPosts[i].postID == req.params.postID){

                arrayOfPosts[i].headerImage = req.body.headerImage;
                arrayOfPosts[i].content = req.body.content;

                res.json('{"Status”: 22, “Message”: “Post updated!"}');
                return;
            }
        }

        res.json('{"Status”: 404, “Message”: “Post Not Found!"}');

    }else{
        res.json('{"Status”: 401, “Message”: “User Not Authorized!"}');
    }
});

postRouter.delete('/Posts/:postID',(req,res)=> {

    if(!req.cookies.loggedIn || jwt.verify(req.cookies.loggedIn,'1234567890')){
        //get userID from web token??????
        var decoded = jwt.verify(req.cookies.loggedIn, '1234567890');

        // @ts-ignore
        var userID = decoded.id;

        for (let i = 0; i < arrayOfPosts.length; i++){
            if(arrayOfPosts[i].postID == req.body.postID && arrayOfPosts[i].userID == userID){

                arrayOfPosts.splice(i,i);

                res.json('{"Status”: 240, “Message”: “Post Removed!"}');
                return;
            }
        }

        res.json('{"Status”: 404, “Message”: “Post Not Found!"}');

    }else{
        res.json('{"Status”: 401, “Message”: “User Not Authorized!"}');
    }
});

export {postRouter};
