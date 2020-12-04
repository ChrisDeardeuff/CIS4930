"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const Post_1 = require("../Post");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
Post_1.arrayOfPosts.push(new Post_1.Post("1", new Date().setTime(230020), "Test Post1", "JUST A TEST", "kristoff", "", new Date()));
Post_1.arrayOfPosts.push(new Post_1.Post("12", new Date().setTime(-120103), "Test Post2", "JUST A TEST", "kristoff", "", new Date()));
Post_1.arrayOfPosts.push(new Post_1.Post("33", new Date().setTime(5), "Test Post3", "JUST A TEST", "kristoff", "", new Date()));
postRouter.get('/Posts', (req, res) => {
    Post_1.arrayOfPosts.sort(function (a, b) { return a.createdDate - b.createdDate; });
    res.json(Post_1.arrayOfPosts).status(200);
});
postRouter.get("/Posts/:postID", (req, res) => {
    for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
        if (Post_1.arrayOfPosts[i].postID == req.params.postID) {
            res.json(Post_1.arrayOfPosts[i]).status(200);
        }
    }
    res.status(404).send("Post Not Found");
});
postRouter.post('/Posts', (req, res) => {
    let incomingToken = req.headers;
    var authorized;
    if (authorized) {
        //get userID from web token??????
        var userID = "";
        Post_1.arrayOfPosts.push(new Post_1.Post(String(Post_1.arrayOfPosts.length), new Date().getDate(), req.body.title, req.body.content, userID, req.body.headerImage, new Date()));
    }
    else {
        res.status(401).send("User not Authorized");
    }
});
postRouter.patch('/Posts/:postID', (req, res) => {
    let incomingToken = req.headers;
    var authorized;
    if (authorized) {
        //get userID from web token??????
        var userID = "";
        for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
            if (Post_1.arrayOfPosts[i].postID == req.params.postID) {
                Post_1.arrayOfPosts[i].headerImage = req.body.headerImage;
                Post_1.arrayOfPosts[i].content = req.body.content;
                res.status(200).send("Post updated");
                return;
            }
        }
        res.status(404).send("Post not Found");
    }
    else if (!authorized) {
        res.status(401).send("User not Authorized");
    }
});
postRouter.delete('/Posts/:postID', (req, res) => {
    let incomingToken = req.headers;
    var authorized;
    if (authorized) {
        //get userID from web token??????
        var userID = "";
        for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
            if (Post_1.arrayOfPosts[i].postID == req.body.postID) {
                Post_1.arrayOfPosts.splice(i, i);
                res.status(240).send("Post removed");
                return;
            }
        }
        res.status(404).send("Post not Found");
    }
    else if (!authorized) {
        res.status(401).send("User not Authorized");
    }
});
//# sourceMappingURL=postRouter.js.map