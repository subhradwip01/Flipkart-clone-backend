import slugify from "slugify"
import Product from "../models/product.js"


export const createProductController = (req,res,next)=>{
    const {
        name,
        price,
        description,
        category,
        quantity
    } = req.body

    let productPictures = []

    if(req.files.length > 0) {
        productPictures =  req.files.map(file => {
            return {
                img: process.env.BASE_LINK +"/" + file.filename
            }
        })
    }

    const product = new Product ( {
        name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createBy:req.user._id
    })

    product.save(
    (error,product)=>{
        if(error) {
            return res.status(400).json({
                error
            })
        }

        res.status(200).json({
            product
        })
    })
}


export const getProductController = (req,res,next)=>{
    Product.find({})
    .exec((error,products)=>{
        
        if(error){
            res.status(400).json({
                error
            })
        }
        // console.log(categories)
        
        if(products){
            res.status(200).json({
                products
            })
        }
    })
}