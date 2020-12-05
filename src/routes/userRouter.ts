import express from 'express';
import {User, arrayOfUsers} from '../User';
import {arrayOfPosts, Post} from "../Post";
import jwt from 'jsonwebtoken';
import emailValidator from 'email-validator'
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })

arrayOfUsers.push(new User("kristoff","Chris", "Deardeuff","example@example","pass"));


const usersRouter = express.Router();

usersRouter.get('/Users',(req,res)=>{

    res.json(arrayOfUsers);
    res.end();
});

usersRouter.get("/Users/:userID",(req,res)=>{
    for(let i = 0; i < arrayOfUsers.length; i++){
        if(arrayOfUsers[i].userID == req.params.userID) {
            res.json(arrayOfUsers[i]);
            return;
        }
    }
    res.json('{"Status”: 404, “Message”: “User Does not Exist"}');

});

usersRouter.post('/Users',jsonParser,(req,res)=>{

    let newUser:User = new User(req.body.userId,req.body.firstName,req.body.lastName,req.body.emailAddress,req.body.password);

    if(!emailValidator.validate(newUser.eAddr)){
        res.json('{"Status”: 409, “Message”: “Email not valid"}');
        return;
    }

    for(let i = 0; i < arrayOfUsers.length; i++){
        if(arrayOfUsers[i].userID == newUser.userID){

            res.json('{"Status”: 409, “Message”: “User Already Exists"}');
            return;
        }

    }
        arrayOfUsers.push(newUser);
        res.json(newUser);

});
usersRouter.patch('/Users/:userID',jsonParser,(req,res)=> {

    if(req.cookies.loggedIn){
        try{
            let token = jwt.verify(req.cookies.loggedIn,'1234567890')

            if(!emailValidator.validate(req.body.emailAddress)){
                res.json('{"Status”: 409, “Message”: “Email not valid"}');
                return;
            }
            for(let i = 0; i < arrayOfUsers.length; i++){
                if(arrayOfUsers[i].userID == req.params.userID) {

                    arrayOfUsers[i].name = req.body.name;
                    arrayOfUsers[i].lname = req.body.lastName;
                    arrayOfUsers[i].eAddr = req.body.email;
                    arrayOfUsers[i].password = req.body.password;

                    res.json(arrayOfUsers[i]).sendStatus(201);
                    return;
                }
            }
            res.json('{"Status”: 404, “Message”: “User Not Found"}');
        }catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }

    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized User"}');
    }

});

usersRouter.delete('/Users/:userID',(req,res)=> {
    if(req.cookies.loggedIn){
        try {
            let token = jwt.verify(req.cookies.loggedIn, '1234567890')
            for (let i = 0; i < arrayOfUsers.length; i++) {

                if (arrayOfUsers[i].userID == req.params.userID) {

                    arrayOfUsers.splice(i, i);
                    res.json('{"Status”: 200, “Message”: “User Deleted"}');
                    break;
                }
            }
            res.json('{"Status”: 404, “Message”: “User Not Found"}');
        }catch{
            res.json('{"Status”: 401, “Message”: “Unauthorized User"}');
        }
    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized User"}');
    }

});
usersRouter.get("/Users/:userID/:password",(req,res)=>{

    for (let i = 0; i < arrayOfUsers.length ; i++) {

        let user:User = arrayOfUsers[i];
        if(user._userID == req.params.userID && user.password == req.params.password){

            let myToken = jwt.sign({user, id:user._userID},'1234567890',);
            res.cookie('loggedIn',myToken);

            res.json('{"Status”: 200, “Message”: “Authorized User"}');
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
