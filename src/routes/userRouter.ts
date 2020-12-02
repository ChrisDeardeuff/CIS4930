import express from 'express';
import {User} from '../User';
import path from "path";
import {arrayOfPosts, Post} from "../Post";

let arrayOfUsers = new Array();

arrayOfUsers.push(new User("kristoff","Chris", "Deardeuff","example@example","pass"));
const usersRouter = express.Router();

usersRouter.get('/Users',(req,res)=>{

    res.json(arrayOfUsers);
    res.sendFile(path.join(process.cwd(),'public/views/userForm.html'))
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

    let newUser = new User(req.body.userID,req.body.name,req.body.lastName,req.body.email,req.body.password);

    for(let i = 0; i < arrayOfUsers.length - 1; i++){
        if(arrayOfUsers[i].userID == newUser.userID){
            res.send("User Already exists!");
            res.sendStatus(409);
            return;
        }
    }
        arrayOfUsers.push(newUser);
        res.json(newUser);
        res.sendStatus(201);


});

usersRouter.patch('/User/:userID',(req,res)=> {
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
    res.sendStatus(404);
    res.send("User Not Found!");

});

usersRouter.delete('/User/:userID',(req,res)=> {
    for(let i = 0; i < arrayOfUsers.length; i++){
        if(arrayOfUsers[i].userID == req.body.userID) {

            arrayOfUsers[i] = null;
            res.send("User removed!");
            break;
        }
    }
    res.send("User Not Found!");
    res.sendStatus(404);


});
usersRouter.get('/User/Posts/:userID',(req,res)=> {

    let tempPosts: Post[] = [];

    for(let i = 0; i < arrayOfPosts.length; i++){

        if(arrayOfPosts[i].userID == req.body.userID) {
            tempPosts.push(arrayOfPosts[i]);
        }
    }
    res.send(tempPosts);

});
export {usersRouter};
