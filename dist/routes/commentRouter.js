"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const Post_1 = require("../Post");
const Comment_1 = require("../Comment");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
commentRouter.get('/Comments/:postID', (req, res) => {
    var tempArray = [];
    for (let i = 0; i < Comment_1.arrayOfComments.length; i++) {
        if (Comment_1.arrayOfComments[i].postID == req.params.postID) {
            tempArray.push(Comment_1.arrayOfComments[i]);
        }
    }
    res.json(tempArray);
});
commentRouter.post('/Comments/:postID', (req, res) => {
    if (req.cookies.loggedIn) {
        try {
            let token = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            var decoded = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            // @ts-ignore
            let userID = decoded.id;
            var comment = new Comment_1.Comment(Comment_1.arrayOfComments.length, req.body.comment, req.cookies.id, req.params.postID, new Date());
            for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
                if (Post_1.arrayOfPosts[i].postID == comment.postID) {
                    Comment_1.arrayOfComments.push(comment);
                    res.json('{"Status”: 200, “Message”: "Comment Posted!"}');
                    return;
                }
            }
        }
        catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }
        res.json('{"Status”: 404, “Message”: "Post Not Found!"}');
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
commentRouter.patch('/Comments/:postID/:commentID', (req, res) => {
    if (req.cookies.loggedIn) {
        try {
            let token = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            var decoded = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            // @ts-ignore
            let userID = decoded.id;
            for (let i = 0; i < Comment_1.arrayOfComments.length; i++) {
                if (Comment_1.arrayOfComments[i].commentID == parseInt(req.params.commentID) && Comment_1.arrayOfComments[i].postID == req.params.postID) {
                    Comment_1.arrayOfComments[i].comment = req.body.comment;
                    res.json('{"Status”: 200, “Message”: "Comment Patched"}');
                    return;
                }
            }
            res.json('{"Status”: 404, “Message”: "Post or Comment Not Found!"}');
        }
        catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
commentRouter.delete('/Comments/:postID/:commentID', (req, res) => {
    if (req.cookies.loggedIn) {
        try {
            for (let i = 0; i < Comment_1.arrayOfComments.length; i++) {
                if (Comment_1.arrayOfComments[i].commentID == parseInt(req.params.commentID) && Comment_1.arrayOfComments[i].postID == req.params.postID && req.cookies.id == Comment_1.arrayOfComments[i].userId) {
                    Comment_1.arrayOfComments.splice(i, i);
                    res.json('{"Status”: 200, “Message”: "Comment Deleted!"}');
                    return;
                }
            }
            res.json('{"Status”: 404, “Message”: "Post or Comment Not Found (or you are not author)!"}');
        }
        catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
commentRouter.get('/Comments/:postID/:commentID', (req, res) => {
    for (let i = 0; i < Comment_1.arrayOfComments.length; i++) {
        if (Comment_1.arrayOfComments[i].commentID == parseInt(req.params.commentID) && Comment_1.arrayOfComments[i].postID == req.params.postID) {
            res.json(Comment_1.arrayOfComments[i]);
            return;
        }
    }
    res.json('{"Status”: 404, “Message”: "Post or Comment Not Found!"}');
});
//# sourceMappingURL=commentRouter.js.map