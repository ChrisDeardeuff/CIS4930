"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.arrayOfPosts = void 0;
class Post {
    constructor(postID, createdDate, title, content, userID, headerImage, lastUpdated) {
        this.postID = postID;
        this.createdDate = createdDate;
        this.title = title;
        this.content = content;
        this.userID = userID;
        this.headerImage = headerImage;
        this.lastUpdated = lastUpdated;
    }
}
exports.Post = Post;
// @ts-ignore
exports.arrayOfPosts = [];
//# sourceMappingURL=Post.js.map