"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const Post_1 = require("../Post");
const Category_1 = require("../Category");
const categoryRouter = express_1.default.Router();
exports.categoryRouter = categoryRouter;
categoryRouter.get('/Categories', (req, res) => {
    res.json(Category_1.arrayOfCategories).status(200);
});
categoryRouter.post('/Categories', (req, res) => {
    let incomingToken = req.headers;
    var authorized;
    if (authorized) {
        //get userID from web token??????
        var userID = "";
        Category_1.arrayOfCategories.push(new Category_1.Category(String(Category_1.arrayOfCategories.length), req.body.categoryName, req.body.categoryDescription));
    }
    else if (!authorized) {
        res.status(401).send("User not Authorized");
    }
});
categoryRouter.get('/Categories/:categoryID', (req, res) => {
    for (let i = 0; i < Category_1.arrayOfCategories.length; i++) {
        if (Category_1.arrayOfCategories[i].categoryID == req.params.categoryID) {
            res.json(Category_1.arrayOfCategories[i]).status(200);
            return;
        }
    }
    res.status(404).send("Category not found");
});
categoryRouter.patch('/Categories/:categoryID', (req, res) => {
    let incomingToken = req.headers;
    var authorized;
    if (authorized) {
        //get userID from web token??????
        var userID = "";
        for (let i = 0; i < Post_1.arrayOfPosts.length; i++) {
            if (Category_1.arrayOfCategories[i].categoryID == req.params.categoryID) {
                Category_1.arrayOfCategories[i].description = req.body.description;
                Category_1.arrayOfCategories[i].name = req.body.name;
                res.status(200).send("Category updated");
                return;
            }
        }
    }
    else if (!authorized) {
        res.status(401).send("User not Authorized");
    }
});
categoryRouter.delete('/Categories/:categoryID', (req, res) => {
});
//# sourceMappingURL=categoryRouter.js.map