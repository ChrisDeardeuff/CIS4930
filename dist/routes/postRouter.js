"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const Post_1 = require("../Post");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
//arrayOfPosts.push(new Post("1", new Date().setTime(230020),"Test Post1","JUST A TEST","kristoff","",new Date()));
//arrayOfPosts.push(new Post("12", new Date().setTime(-120103),"Test Post2","JUST A TEST","kristoff","",new Date()));
//arrayOfPosts.push(new Post("33", new Date().setTime(5),"Test Post3","JUST A TEST","kristoff","",new Date()));
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
    res.json('{"Status”: 404, “Message”: “Post Not Found!"}');
});
postRouter.post('/Posts', (req, res) => {
    if (req.cookies.loggedIn) {
        try {
            let token = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            var decoded = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            // @ts-ignore
            let userID = decoded.id;
            Post_1.arrayOfPosts.push(new Post_1.Post(String(Post_1.arrayOfPosts.length), new Date().getDate(), req.body.title, req.body.content, userID, req.body.headerImage, new Date()));
            res.json('{"Status”: 200, “Message”: “Post Posted!"}');
        }
        catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }
    }
    else {
        res.json('{"Status”: 401, “Message”: “User not authorized!"}');
    }
});
postRouter.patch('/Posts/:postID', (req, res) => {
    if (!req.cookies.loggedIn || jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890')) {
        for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
            if (Post_1.arrayOfPosts[i].postID == req.params.postID) {
                Post_1.arrayOfPosts[i].headerImage = req.body.headerImage;
                Post_1.arrayOfPosts[i].content = req.body.content;
                res.json('{"Status”: 22, “Message”: “Post updated!"}');
                return;
            }
        }
        res.json('{"Status”: 404, “Message”: “Post Not Found!"}');
    }
    else {
        res.json('{"Status”: 401, “Message”: “User Not Authorized!"}');
    }
});
postRouter.delete('/Posts/:postID', (req, res) => {
    if (!req.cookies.loggedIn || jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890')) {
        //get userID from web token??????
        var decoded = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
        // @ts-ignore
        var userID = decoded.id;
        for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
            if (Post_1.arrayOfPosts[i].postID == req.body.postID && Post_1.arrayOfPosts[i].userID == userID) {
                Post_1.arrayOfPosts.splice(i, i);
                res.json('{"Status”: 240, “Message”: “Post Removed!"}');
                return;
            }
        }
        res.json('{"Status”: 404, “Message”: “Post Not Found!"}');
    }
    else {
        res.json('{"Status”: 401, “Message”: “User Not Authorized!"}');
    }
});
//# sourceMappingURL=postRouter.js.map