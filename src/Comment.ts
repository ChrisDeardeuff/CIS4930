// @ts-ignore
import {PostCategory} from "./PostCategory";

class Comment{

    public commentID:number;
    public commentDate:Date;
    public comment:string = "";
    public userId:string = "";
    public postID:string ="";

    constructor(commentID:number,comment:string,userId:string,postID:string,commentDate:Date){

        this.commentID = commentID;
        this.comment=comment;
        this.userId=userId;
        this.postID=postID;
        this.commentDate = commentDate;
    }

}
export{Comment};
export let arrayOfComments: Comment[] = [];
