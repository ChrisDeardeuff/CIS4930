"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../User");
const Post_1 = require("../Post");
User_1.arrayOfUsers.push(new User_1.User("kristoff", "Chris", "Deardeuff", "example@example", "pass"));
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
usersRouter.get('/Users', (req, res) => {
    res.json(User_1.arrayOfUsers);
    res.end();
});
usersRouter.get("/User/:userID", (req, res) => {
    for (let i = 0; i < User_1.arrayOfUsers.length; i++) {
        if (User_1.arrayOfUsers[i].userID == req.params.userID) {
            res.json(User_1.arrayOfUsers[i]);
            return;
        }
    }
    res.status(404);
    res.send("User not Found!");
});
usersRouter.post('/Users', (req, res) => {
    let newUser = new User_1.User(req.body.userID, req.body.firstName, req.body.lastName, req.body.emailAddress, req.body.password);
    for (let i = 0; i < User_1.arrayOfUsers.length - 1; i++) {
        if (User_1.arrayOfUsers[i].userID == newUser.userID) {
            res.sendStatus(409).send("USER ALREADY EXISTS!");
            return;
        }
    }
    User_1.arrayOfUsers.push(newUser);
    res.sendStatus(201).json(newUser);
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
usersRouter.patch('/User/:userID', (req, res) => {
    for (let i = 0; i < User_1.arrayOfUsers.length; i++) {
        if (User_1.arrayOfUsers[i].userID == req.params.userID) {
            User_1.arrayOfUsers[i].userID = req.body.userID;
            User_1.arrayOfUsers[i].name = req.body.name;
            User_1.arrayOfUsers[i].lname = req.body.lastName;
            User_1.arrayOfUsers[i].eAddr = req.body.email;
            User_1.arrayOfUsers[i].password = req.body.password;
            res.sendStatus(201);
            res.json(User_1.arrayOfUsers[i]);
            break;
        }
    }
    res.sendStatus(404);
    res.send("User Not Found!");
});
usersRouter.delete('/User/:userID', (req, res) => {
    for (let i = 0; i < User_1.arrayOfUsers.length; i++) {
        if (User_1.arrayOfUsers[i].userID == req.body.userID) {
            User_1.arrayOfUsers.splice(i, i);
            res.send("User removed!");
            break;
        }
    }
    res.send("User Not Found!");
    res.sendStatus(404);
});
//# sourceMappingURL=userRouter.js.map