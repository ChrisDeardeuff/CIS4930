import express from 'express';
import {Post,arrayOfPosts} from '../Post';
import {User,arrayOfUsers} from "../User";
import {Category, arrayOfCategories} from "../Category";
import path from "path";

const categoryRouter = express.Router();

categoryRouter.get('/Categories',(req,res)=>{
    res.json(arrayOfCategories).status(200);
});

categoryRouter.post('/Categories',(req,res)=>{

    let incomingToken = req.headers;
    var authorized;

    if(authorized){
        //get userID from web token??????
        var userID:string = "";

        arrayOfCategories.push(new Category(String(arrayOfCategories.length),req.body.categoryName,req.body.categoryDescription));

    }else if(!authorized){
        res.status(401).send("User not Authorized");
    }
});

categoryRouter.get('/Categories/:categoryID',(req,res)=>{
    for (let i = 0; i < arrayOfCategories.length ; i++) {
        if(arrayOfCategories[i].categoryID == req.params.categoryID){
            res.json(arrayOfCategories[i]).status(200);
            return;
        }
    }
    res.status(404).send("Category not found")
});

categoryRouter.patch('/Categories/:categoryID',(req,res)=>{
    let incomingToken = req.headers;
    var authorized;

    if(authorized){
        //get userID from web token??????
        var userID:string = "";
        for (let i = 0; i < arrayOfPosts.length; i++){
            if(arrayOfCategories[i].categoryID == req.params.categoryID){

                arrayOfCategories[i].description = req.body.description;
                arrayOfCategories[i].name = req.body.name;

                res.status(200).send("Category updated");
                return;
            }
        }

    }else if(!authorized){
        res.status(401).send("User not Authorized");
    }
});

categoryRouter.delete('/Categories/:categoryID',(req,res)=>{

});
export {categoryRouter};