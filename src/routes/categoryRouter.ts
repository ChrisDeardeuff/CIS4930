import express from 'express';
import {Post,arrayOfPosts} from '../Post';
import {User,arrayOfUsers} from "../User";
import {Category, arrayOfCategories} from "../Category";
import path from "path";
import jwt from "jsonwebtoken";

const categoryRouter = express.Router();

categoryRouter.get('/Categories',(req,res)=>{
    res.json(arrayOfCategories).status(200);
});

categoryRouter.post('/Categories',(req,res)=>{

    if(!req.cookies.loggedIn || jwt.verify(req.cookies.loggedIn,'1234567890')){
        //get userID from web token??????
        let userID = req.cookies.loggedIn._userID;

        arrayOfCategories.push(new Category(String(arrayOfCategories.length),req.body.categoryName,req.body.categoryDescription));

    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});

categoryRouter.get('/Categories/:categoryID',(req,res)=>{
    for (let i = 0; i < arrayOfCategories.length ; i++) {
        if(arrayOfCategories[i].categoryID == req.params.categoryID){
            res.json(arrayOfCategories[i]).status(200);
            return;
        }
    }
    res.json('{"Status”: 404, “Message”: “Category Not Found!"}');
});

categoryRouter.patch('/Categories/:categoryID',(req,res)=>{
    let incomingToken = req.headers;
    var authorized;

    if(!req.cookies.loggedIn || jwt.verify(req.cookies.loggedIn,'1234567890')){
        //get userID from web token??????
        let userID = req.cookies.loggedIn._userID;

        for (let i = 0; i < arrayOfPosts.length; i++){
            if(arrayOfCategories[i].categoryID == req.params.categoryID){

                arrayOfCategories[i].description = req.body.description;
                arrayOfCategories[i].name = req.body.name;

                res.json('{"Status”: 200, “Message”: “Category updated!"}');
                return;
            }
        }

    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});

categoryRouter.delete('/Categories/:categoryID',(req,res)=>{

    if(!req.cookies.loggedIn || jwt.verify(req.cookies.loggedIn,'1234567890')){
        //get userID from web token??????
        let userID = req.cookies.loggedIn._userID;

        for (let i = 0; i < arrayOfPosts.length; i++){
            if(arrayOfCategories[i].categoryID == req.params.categoryID){

                arrayOfCategories.splice(i,i);

                res.json('{"Status”: 200, “Message”: “Category removed!"}');
                return;
            }
        }
        res.json('{"Status”: 404, “Message”: “Post Not Found!"}');

    }else{
        res.json('{"Status”: 401, “Message”: “Unauthorized!"}');
    }
});
export {categoryRouter};
