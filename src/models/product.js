import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    offer: {
      type: Number,
    },
    productPictures: [
      {
        img: {
          type: String,
        },
      },
    ],
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: { type: String },
      },
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true
    },
    createBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true 
    },
    UpdatedAt: Date
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
