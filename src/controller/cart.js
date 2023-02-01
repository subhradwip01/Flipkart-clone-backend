import Cart from "../models/cart.js";

export const addCartItemsController = (req, res, next) => {
  Cart.findOne({ userId: req.user._id })
  .exec((error, cart) => {
    if(error) {
        return res.status(400).json({
            message:"Something went wrong!"
        })
    }
    if (cart) { 
      const cartItemIndex = cart.cartItems.findIndex(
        (item) => item.productId.toString() === req.body.productId.toString()
      );
      let condition, action;
      if (cartItemIndex >= 0) {
        condition = {userId:req.user._id,"cartItems.productId":req.body.productId}
        action = {
            "$set":{
                "cartItems.$":{
                    ...req.body,
                    quantity:req.body.quantity+cart.cartItems[cartItemIndex].quantity,
                }
            }
        }
      } else {
        condition = {userId:req.user._id};
        action = {
            "$push":{
                "cartItems":{
                    ...req.body,
                }
            }
        }
      }
      Cart.findOneAndUpdate(condition,action,{new: true}).exec((error,newCart)=>{
        if(error) {
            return res.status(400).json({error})
        }
        return res.status(200).json({
            newCart
        })
    })
      
    } else {
      const cart = new Cart({
        userId: req.user._id,
        cartItems: [{
            productId:req.body.productId,
            price:req.body.price,
            quantity:req.body.quantity
            
          }],
      });
      cart.save((error, cart) => {
        if (error) {
          return res.status(400).json({
            error,
          });
        }
        if (cart) {
          return res.status(200).json({
            cart
          });
        }
      });
    }
  });
};

export const getCartItemsController = (req, res, next) => {};
