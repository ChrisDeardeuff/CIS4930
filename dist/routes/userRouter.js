"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../User");
const Post_1 = require("../Post");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_validator_1 = __importDefault(require("email-validator"));
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });
User_1.arrayOfUsers.push(new User_1.User("kristoff", "Chris", "Deardeuff", "example@example", "pass"));
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
usersRouter.get('/Users', (req, res) => {
    res.json(User_1.arrayOfUsers);
    res.end();
});
usersRouter.get("/Users/:userID", (req, res) => {
    for (let i = 0; i < User_1.arrayOfUsers.length; i++) {
        if (User_1.arrayOfUsers[i].userID == req.params.userID) {
            res.json(User_1.arrayOfUsers[i]);
            return;
        }
    }
    res.json('{"Status”: 404, “Message”: “User Does not Exist"}');
});
usersRouter.post('/Users', jsonParser, (req, res) => {
    let newUser = new User_1.User(req.body.userId, req.body.firstName, req.body.lastName, req.body.emailAddress, req.body.password);
    if (!email_validator_1.default.validate(newUser.eAddr)) {
        res.json('{"Status”: 409, “Message”: “Email not valid"}');
        return;
    }
    for (let i = 0; i < User_1.arrayOfUsers.length; i++) {
        if (User_1.arrayOfUsers[i].userID == newUser.userID) {
            res.json('{"Status”: 409, “Message”: “User Already Exists"}');
            return;
        }
    }
    User_1.arrayOfUsers.push(newUser);
    res.json(newUser);
});
usersRouter.patch('/Users/:userID', jsonParser, (req, res) => {
    if (req.cookies.loggedIn) {
        try {
            let token = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            if (!email_validator_1.default.validate(req.body.emailAddress)) {
                res.json('{"Status”: 409, “Message”: “Email not valid"}');
                return;
            }
            for (let i = 0; i < User_1.arrayOfUsers.length; i++) {
                if (User_1.arrayOfUsers[i].userID == req.params.userID) {
                    User_1.arrayOfUsers[i].name = req.body.name;
                    User_1.arrayOfUsers[i].lname = req.body.lastName;
                    User_1.arrayOfUsers[i].eAddr = req.body.email;
                    User_1.arrayOfUsers[i].password = req.body.password;
                    res.json(User_1.arrayOfUsers[i]).sendStatus(201);
                    return;
                }
            }
            res.json('{"Status”: 404, “Message”: “User Not Found"}');
        }
        catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized User"}');
    }
});
usersRouter.delete('/Users/:userID', (req, res) => {
    if (req.cookies.loggedIn) {
        try {
            let token = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            for (let i = 0; i < User_1.arrayOfUsers.length; i++) {
                if (User_1.arrayOfUsers[i].userID == req.params.userID) {
                    User_1.arrayOfUsers.splice(i, i);
                    res.json('{"Status”: 200, “Message”: “User Deleted"}');
                    break;
                }
            }
            res.json('{"Status”: 404, “Message”: “User Not Found"}');
        }
        catch {
            res.json('{"Status”: 401, “Message”: “Unauthorized User"}');
        }
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized User"}');
    }
});
usersRouter.get("/Users/:userID/:password", (req, res) => {
    for (let i = 0; i < User_1.arrayOfUsers.length; i++) {
        let user = User_1.arrayOfUsers[i];
        if (user._userID == req.params.userID && user.password == req.params.password) {
            let myToken = jsonwebtoken_1.default.sign({ user, id: user._userID }, '1234567890');
            res.cookie('loggedIn', myToken);
            res.json('{"Status”: 200, “Message”: “Authorized User"}');
        }
    }
    res.json('{"Status”: 401, “Message”: “Unauthorized User"}');
});
usersRouter.get('/Users/Posts/:userID', (req, res) => {
    let tempPosts = [];
    for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
        if (Post_1.arrayOfPosts[i].userID == req.params.userID) {
            tempPosts.push(Post_1.arrayOfPosts[i]);
        }
    }
    res.json(tempPosts);
    res.send("Found posts");
});
//# sourceMappingURL=userRouter.js.map