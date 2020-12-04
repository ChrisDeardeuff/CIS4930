import {Post} from "./Post";

class Category{

    public categoryID:string;
    public name:string;
    public description:string;

    constructor(categoryID:string,name:string,description:string) {
        this.categoryID = categoryID;
        this.name = name;
        this.description = description;
    }
}
export let arrayOfCategories: Category[] = [];

export {Category};
