import express from 'express';
import {User,arrayOfUsers} from '../User';
import {arrayOfPosts, Post} from "../Post";


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

    for(let i = 0; i < arrayOfUsers.length - 1; i++){
        if(arrayOfUsers[i].userID == newUser.userID){
            res.sendStatus(409).send("USER ALREADY EXISTS!");
            return;
        }
    }
        arrayOfUsers.push(newUser);
        res.sendStatus(201).json(newUser);

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

            arrayOfUsers.splice(i,i);
            res.send("User removed!");
            break;
        }
    }
    res.send("User Not Found!");
    res.sendStatus(404);


});
export {usersRouter};
