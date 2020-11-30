// @ts-ignore
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
