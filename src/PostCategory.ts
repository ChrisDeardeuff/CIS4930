import exp from "constants";
import {Category} from "./Category";

class PostCategory{

    public categoryID:number;
    public postID:number;

    constructor(categoryID:number,postID:number) {
        this.categoryID = categoryID;
        this.postID = postID;
    }


}
export let arrayOfPostCategories: PostCategory[] = [];
export{PostCategory};
