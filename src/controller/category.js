import slugify from "slugify";
import Category from "../models/category.js";
export const createCategoryController = (req,res,next)=>{
    const categoryObj=  {
        name: req.body.name,
        slug: slugify(req.body.name),
    }
    if(req.body.parentId){
        categoryObj.parentId=req.body.parentId
    }
    console.log(categoryObj)
    const cat = new Category(categoryObj);
    cat.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        if(category){
            res.status(201).json({
                category
            })
        }
    })
}

export const getCategoryController = (req,res,next)=>{
    Category.find({})
    .exec((error,categories)=>{
        
        if(error){
            res.status(400).json({
                error
            })
        }

        if(categories){
            res.status(200).json({
                categories
            })
        }
    })
}