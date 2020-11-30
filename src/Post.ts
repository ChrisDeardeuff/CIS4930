class Post{

    public postID:number;
    public createdDate:Date;
    public title:string;
    public content:string;
    public userID:string;
    public headerImage:string;
    public lastUpdated:Date;

    constructor(postID:number,createdDate:Date,title:string,content:string,userID:string,headerImage:string,lastUpdated:Date) {
        this.postID=postID;
        this.createdDate=createdDate;
        this.title=title;
        this.content=content;
        this.userID=userID;
        this.headerImage=headerImage;
        this.lastUpdated=lastUpdated;
    }

}
