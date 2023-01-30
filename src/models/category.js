import mongoose, { trusted } from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required:true,
        unique:true
    },
    parebtId:{
        type: String,
    }
},{
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema)
export default Category;