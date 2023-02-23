import multer from "multer";
import path from "path"
import { fileURLToPath } from "url";
import slugify from "slugify";

export const createCategoryList = (categories,parentId = null) => {
    const categoryList = [];
    console.log("categories",categories,"parentId",parentId)
    let filterdCat;
    if(parentId === null) {
        filterdCat = categories.filter(cat=>cat.parentId == undefined);
    }else{
        filterdCat = categories.filter(cat=>cat.parentId == parentId);
    }
    
    for ( let cat of filterdCat){
        categoryList.push({
            _id:cat._id,
            name:cat.name,
            slug:cat.slug,
            parentId:cat.parentId,
            children: createCategoryList(categories,cat._id)
        })
    }

    return categoryList;
}

const __filename = fileURLToPath(import.meta.url);
export const imagePath = path.join(path.dirname(__filename),'../uploads/')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagePath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, slugify(uniqueSuffix + "-" + file.originalname))
    }
})

export const upload = multer({storage})
