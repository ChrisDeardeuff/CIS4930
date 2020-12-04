import express from 'express';
import {Post,arrayOfPosts} from '../Post';
import path from "path";

const postRouter = express.Router();

arrayOfPosts.push(new Post("1", new Date().setTime(230020),"Test Post1","JUST A TEST","kristoff","",new Date()));
arrayOfPosts.push(new Post("12", new Date().setTime(-120103),"Test Post2","JUST A TEST","kristoff","",new Date()));
arrayOfPosts.push(new Post("33", new Date().setTime(5),"Test Post3","JUST A TEST","kristoff","",new Date()));

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
    res.status(404).send("Post Not Found");
});

postRouter.post('/Posts',(req,res)=>{
    let incomingToken = req.headers;
    var authorized;

    if(authorized){
        //get userID from web token??????
        var userID:string = "";
        arrayOfPosts.push(new Post(String(arrayOfPosts.length),new Date().getDate(),req.body.title,req.body.content,userID,req.body.headerImage,new Date()));
    }else{
        res.status(401).send("User not Authorized")
    }

});

postRouter.patch('/Posts/:postID',(req,res)=> {
    let incomingToken = req.headers;
    var authorized;

    if(authorized){
        //get userID from web token??????
        var userID:string = "";

        for (let i = 0; i < arrayOfPosts.length; i++){
            if(arrayOfPosts[i].postID == req.params.postID){

                arrayOfPosts[i].headerImage = req.body.headerImage;
                arrayOfPosts[i].content = req.body.content;

                res.status(200).send("Post updated");
                return;
            }
        }

            res.status(404).send("Post not Found");

    }else if(!authorized){
        res.status(401).send("User not Authorized");
    }
});

postRouter.delete('/Posts/:postID',(req,res)=> {

    let incomingToken = req.headers;
    var authorized;

    if(authorized){
        //get userID from web token??????
        var userID:string = "";

        for (let i = 0; i < arrayOfPosts.length; i++){
            if(arrayOfPosts[i].postID == req.body.postID){

                arrayOfPosts.splice(i,i);

                res.status(240).send("Post removed");
                return;
            }
        }

        res.status(404).send("Post not Found");

    }else if(!authorized){
        res.status(401).send("User not Authorized");
    }

});

export {postRouter};
