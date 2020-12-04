import exp from "constants";
import {Category} from "./Category";

class PostCategory{

    public categoryID:string;
    public postID:string;

    constructor(categoryID:string,postID:string) {
        this.categoryID = categoryID;
        this.postID = postID;
    }


}
export let arrayOfPostCategories: PostCategory[] = [];
export{PostCategory};
