import mongoose, { trusted } from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems : [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true
            },
            price: {
               type: Number,
               required: true 
            }
        }
    ]
},{
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema)
export default Cart;