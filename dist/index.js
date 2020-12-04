"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const userRouter_1 = require("./routes/userRouter");
const postRouter_1 = require("./routes/postRouter");
const categoryRouter_1 = require("./routes/categoryRouter");
const postCategoryRouter_1 = require("./routes/postCategoryRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
let app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(userRouter_1.usersRouter);
app.use(postRouter_1.postRouter);
app.use(categoryRouter_1.categoryRouter);
app.use(postCategoryRouter_1.postCategoryRouter);
app.use('/', (req, res, next) => {
    console.log(process.cwd());
    res.sendFile(path_1.default.join(process.cwd(), 'public/views/index.html'));
});
let server = http_1.default.createServer(app);
server.listen(3000);
//# sourceMappingURL=index.js.map