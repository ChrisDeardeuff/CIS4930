class Post{

    public postID:string;
    public createdDate:number;
    public title:string;
    public content:string;
    public userID:string;
    public headerImage:string;
    public lastUpdated:Date;

    constructor(postID:string,createdDate:number,title:string,content:string,userID:string,headerImage:string,lastUpdated:Date) {
        this.postID=postID;
        this.createdDate = createdDate;
        this.title=title;
        this.content=content;
        this.userID=userID;
        this.headerImage=headerImage;
        this.lastUpdated=lastUpdated;
    }

}
// @ts-ignore
export let arrayOfPosts: Post[] = [];


export {Post};
