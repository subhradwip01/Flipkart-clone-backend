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
      if (cartItemIndex >= 0) {
        Cart.findOneAndUpdate({userId:req.user._id,"cartItems.productId":req.body.productId},{
            "$set":{
                "cartItems.$":{
                    ...req.body,
                    quantity:req.body.quantity+cart.cartItems[cartItemIndex].quantity,
                }
            }
        })
        .exec((error,newCart)=>{
            if(error) {
                return res.status(400).json({error})
            }
            return res.status(200).json({
                newCart
            })
        })
      } else {
        Cart.findOneAndUpdate({userId:req.user._id},{
            "$push":{
                "cartItems":{
                    ...req.body,
                }
            }
        })
        .exec((error,newCart)=>{
            if(error) {
                return res.status(400).json({error})
            }
            return res.status(200).json({
                newCart
            })
        })
      }
      
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
