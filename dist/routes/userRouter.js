"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../User");
const path_1 = __importDefault(require("path"));
let arrayOfUsers = new Array();
//arrayOfUsers.push(new User("kristoff","Chris", "Deardeuff","example@example","pass"));
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
usersRouter.get('/Users', (req, res) => {
    res.json(arrayOfUsers);
    res.sendFile(path_1.default.join(process.cwd(), 'public/views/userForm.html'));
    res.end();
});
usersRouter.get("/User/:userID", (req, res) => {
    for (let i = 0; i < arrayOfUsers.length; i++) {
        if (arrayOfUsers[i].userID == req.params.userID) {
            res.json(arrayOfUsers[i]);
            return;
        }
    }
    res.status(404);
    res.send("User not Found!");
});
usersRouter.post('/User', (req, res) => {
    let newUser = new User_1.User();
    newUser.userID = req.body.userID;
    newUser.name = req.body.name;
    newUser.lname = req.body.lastName;
    newUser.eAddr = req.body.email;
    newUser.password = req.body.password;
    for (let i = 0; i < arrayOfUsers.length - 1; i++) {
        if (arrayOfUsers[i].userID == newUser.userID) {
            res.send("User Already exists!");
            res.sendStatus(400);
            return;
        }
    }
    arrayOfUsers.push(newUser);
    res.json(newUser);
    res.sendStatus(201);
});
usersRouter.patch('/User/:userID', (req, res) => {
    for (let i = 0; i < arrayOfUsers.length; i++) {
        if (arrayOfUsers[i].userID == req.params.userID) {
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
usersRouter.delete('/User/:userID', (req, res) => {
    for (let i = 0; i < arrayOfUsers.length; i++) {
        if (arrayOfUsers[i].userID == req.body.userID) {
            arrayOfUsers[i] = null;
            res.send("User removed!");
            break;
        }
    }
    res.send("User Not Found!");
    res.sendStatus(404);
});
//# sourceMappingURL=userRouter.js.map