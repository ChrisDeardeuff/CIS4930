"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayOfComments = exports.Comment = void 0;
class Comment {
    constructor(commentID, comment, userId, postID, commentDate) {
        this.comment = "";
        this.userId = "";
        this.postID = "";
        this.commentID = commentID;
        this.comment = comment;
        this.userId = userId;
        this.postID = postID;
        this.commentDate = commentDate;
    }
}
exports.Comment = Comment;
exports.arrayOfComments = [];
//# sourceMappingURL=Comment.js.map