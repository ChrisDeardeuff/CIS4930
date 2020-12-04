"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const Post_1 = require("../Post");
const Category_1 = require("../Category");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const categoryRouter = express_1.default.Router();
exports.categoryRouter = categoryRouter;
categoryRouter.get('/Categories', (req, res) => {
    res.json(Category_1.arrayOfCategories).status(200);
});
categoryRouter.post('/Categories', (req, res) => {
    if (!req.cookies.loggedIn || jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890')) {
        //get userID from web token??????
        let userID = req.cookies.loggedIn._userID;
        Category_1.arrayOfCategories.push(new Category_1.Category(String(Category_1.arrayOfCategories.length), req.body.categoryName, req.body.categoryDescription));
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
categoryRouter.get('/Categories/:categoryID', (req, res) => {
    for (let i = 0; i < Category_1.arrayOfCategories.length; i++) {
        if (Category_1.arrayOfCategories[i].categoryID == req.params.categoryID) {
            res.json(Category_1.arrayOfCategories[i]).status(200);
            return;
        }
    }
    res.json('{"Status”: 404, “Message”: “Category Not Found!"}');
});
categoryRouter.patch('/Categories/:categoryID', (req, res) => {
    let incomingToken = req.headers;
    var authorized;
    if (!req.cookies.loggedIn || jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890')) {
        //get userID from web token??????
        let userID = req.cookies.loggedIn._userID;
        for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
            if (Category_1.arrayOfCategories[i].categoryID == req.params.categoryID) {
                Category_1.arrayOfCategories[i].description = req.body.description;
                Category_1.arrayOfCategories[i].name = req.body.name;
                res.json('{"Status”: 200, “Message”: “Category updated!"}');
                return;
            }
        }
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
categoryRouter.delete('/Categories/:categoryID', (req, res) => {
    if (!req.cookies.loggedIn || jsonwebtoken_1.default.verify(req.cookies.loggedIn, '1234567890')) {
        //get userID from web token??????
        let userID = req.cookies.loggedIn._userID;
        for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
            if (Category_1.arrayOfCategories[i].categoryID == req.params.categoryID) {
                Category_1.arrayOfCategories.splice(i, i);
                res.json('{"Status”: 200, “Message”: “Category removed!"}');
                return;
            }
        }
        res.json('{"Status”: 404, “Message”: “Post Not Found!"}');
    }
    else {
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
//# sourceMappingURL=categoryRouter.js.map