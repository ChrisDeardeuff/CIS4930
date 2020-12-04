"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostCategory_1 = require("../PostCategory");
const postCategoryRouter = express_1.default.Router();
exports.postCategoryRouter = postCategoryRouter;
postCategoryRouter.get('/PostCategories', (req, res) => {
    res.json(PostCategory_1.arrayOfPostCategories).status(200);
});
postCategoryRouter.get('/PostCategories/Posts/:categoryID', (req, res) => {
});
postCategoryRouter.post('/PostCategories/:postID/:categoryID', (req, res) => {
});
postCategoryRouter.delete('/PostCategories/:postID/:categoryID', (req, res) => {
});
//# sourceMappingURL=postCategoryRouter.js.map