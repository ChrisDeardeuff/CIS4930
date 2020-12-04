"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
commentRouter.get('/Comments/:postID', (req, res) => {
});
commentRouter.post('/Comments/:postID', (req, res) => {
});
commentRouter.patch('/Comments/:postID/:commentID', (req, res) => {
});
commentRouter.delete('/Comments/:postID/:commentID', (req, res) => {
});
commentRouter.get('/Comments/:postID/:commentID', (req, res) => {
});
//# sourceMappingURL=commentRouter.js.map