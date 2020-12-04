import express from 'express';
import {User, arrayOfUsers} from '../User';
import {arrayOfPosts, Post} from "../Post";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

arrayOfUsers.push(new User("kristoff","Chris", "Deardeuff","example@example","pass"));


const usersRouter = express.Router();

usersRouter.get('/Users',(req,res)=>{

    res.json(arrayOfUsers);
    res.end();
});

usersRouter.get("/User/:userID",(req,res)=>{
    for(let i = 0; i < arrayOfUsers.length; i++){
        if(arrayOfUsers[i].userID == req.params.userID) {

            res.json(arrayOfUsers[i]);

            return;
        }
    }
    res.status(404);
    res.send("User not Found!");

});

usersRouter.post('/Users',(req,res)=>{

    let newUser = new User(req.body.userID,req.body.firstName,req.body.lastName,req.body.emailAddress,req.body.password);

    for(let i = 0; i < arrayOfUsers.length; i++){
        if(arrayOfUsers[i].userID == newUser.userID){

            res.json('{"Status”: 409, “Message”: “User Already Exists"}');
            return;
        }
    }
        arrayOfUsers.push(newUser);
        res.json(newUser);

});
usersRouter.patch('/User/:userID',(req,res)=> {

    if(!req.cookies.loggedIn || jwt.verify(req.cookies.loggedIn,'1234567890')){
        for(let i = 0; i < arrayOfUsers.length; i++){
            if(arrayOfUsers[i].userID == req.params.userID) {
                arrayOfUsers[i].userID = req.body.userID;
                arrayOfUsers[i].name = req.body.name;
                arrayOfUsers[i].lname = req.body.lastName;
                arrayOfUsers[i].eAddr = req.body.email;
                arrayOfUsers[i].password = req.body.password;

                res.sendStatus(201);
                res.json(arrayOfUsers[i]);

                break;
            }
        }
        res.json('{"Status”: 404, “Message”: “User Not Found"}');
    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized User"}');
    }

});

usersRouter.delete('/User/:userID',(req,res)=> {
    for(let i = 0; i < arrayOfUsers.length; i++){
        if(arrayOfUsers[i].userID == req.body.userID) {

            arrayOfUsers.splice(i,i);
            res.send("User removed!");
            break;
        }
    }
    res.send("User Not Found!");
    res.sendStatus(404);


});
usersRouter.get("/User/:userID/:password",(req,res)=>{

    for (let i = 0; i < arrayOfUsers.length ; i++) {

        let user:User = arrayOfUsers[i];
        if(user._userID == req.params.userID && user.password == req.params.password){
            let myToken = jwt.sign(user,'1234567890');
            res.cookie('loggedIn',myToken);
        }
    }
    res.json('{"Status”: 401, “Message”: “Unauthorized User"}');

});

usersRouter.get('/Users/Posts/:userID',(req,res)=> {

    let tempPosts: Post[] = [];

    for(let i = 0; i < arrayOfPosts.length; i++){

        if(arrayOfPosts[i].userID == req.params.userID) {
            tempPosts.push(arrayOfPosts[i]);

        }
    }
    res.json(tempPosts);
    res.send("Found posts");
});
export {usersRouter};
