"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const Post_1 = require("../Post");
const Category_1 = require("../Category");
const PostCategory_1 = require("../PostCategory");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postCategoryRouter = express_1.default.Router();
exports.postCategoryRouter = postCategoryRouter;
postCategoryRouter.get('/PostCategory/:postID', (req, res) => {
    let tempArray = [];
    for (let i = 0; i < PostCategory_1.arrayOfPostCategories.length; i++) {
        if (PostCategory_1.arrayOfPostCategories[i].postID == req.params.postID) {
            tempArray.push(PostCategory_1.arrayOfPostCategories[i]);
        }
    }
    res.json(tempArray);
});
postCategoryRouter.get('/PostCategory/Posts/:categoryID', (req, res) => {
    let tempArray = [];
    let tempArray2 = [];
    for (let i = 0; i < PostCategory_1.arrayOfPostCategories.length; i++) {
        if (PostCategory_1.arrayOfPostCategories[i].categoryID == req.params.categoryID) {
            tempArray.push(PostCategory_1.arrayOfPostCategories[i]);
        }
    }
    for (let j = 0; j < tempArray.length; j++) {
        for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
            if (tempArray[j].postID == Post_1.arrayOfPosts[i].postID) {
                tempArray2.push(Post_1.arrayOfPosts[i]);
            }
        }
    }
    res.json(tempArray2);
});
postCategoryRouter.post('/PostCategory/:postID/:categoryID', (req, res) => {
    if (req.cookies.loggedIn) {
        try {
            let token = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            var decoded = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            // @ts-ignore
            let userID = decoded.id;
            let newPostCategory = new PostCategory_1.PostCategory(req.params.categoryID, req.params.postID);
            for (let i = 0; i < Category_1.arrayOfCategories.length; i++) {
                if (Category_1.arrayOfCategories[i].categoryID == req.params.categoryID) {
                    for (let j = 0; j < Post_1.arrayOfPosts.length; j++) {
                        if (Post_1.arrayOfPosts[i].postID == req.params.postID) {
                            PostCategory_1.arrayOfPostCategories.push(newPostCategory);
                            return;
                        }
                    }
                }
            }
            res.json('{"Status”: 404, “Message”: “Post or Category ID not found!"}');
        }
        catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
postCategoryRouter.delete('/PostCategory/:postID/:categoryID', (req, res) => {
    if (req.cookies.loggedIn) {
        try {
            let token = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            var decoded = jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890');
            // @ts-ignore
            let userID = decoded.id;
            let newPostCategory = new PostCategory_1.PostCategory(req.params.categoryID, req.params.postID);
            for (let i = 0; i < Category_1.arrayOfCategories.length; i++) {
                if (Category_1.arrayOfCategories[i].categoryID == req.params.categoryID) {
                    for (let j = 0; j < Post_1.arrayOfPosts.length; j++) {
                        if (Post_1.arrayOfPosts[i].postID == req.params.postID) {
                            PostCategory_1.arrayOfPostCategories.splice(i, i);
                            res.json('{"Status”: 200, “Message”: “Post deleted!"}');
                        }
                    }
                }
            }
            res.json('{"Status”: 404, “Message”: “Post or Category ID not found!"}');
        }
        catch {
            res.json('{"Status”: 401, “Message”: “User not authorized!"}');
        }
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
//# sourceMappingURL=postCategoryRouter.js.map