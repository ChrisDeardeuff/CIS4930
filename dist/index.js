"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = require("./routes/userRouter");
const path_1 = __importDefault(require("path"));
let app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(userRouter_1.usersRouter);
app.use('/', (req, res, next) => {
    console.log(process.cwd());
    res.sendFile(path_1.default.join(process.cwd(), 'public/views/index.html'));
});
let server = http_1.default.createServer(app);
server.listen(3000);
//# sourceMappingURL=index.js.map