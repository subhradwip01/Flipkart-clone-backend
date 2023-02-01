import Cart from "../models/cart.js";

export const addCartItemsController = (req, res, next) => {
  Cart.findOne({ userId: req.user._id })
  .exec((error, cart) => {
    if (cart) { 
      const cartItemIndex = cart.cartItems.findIndex(
        (item) => item.productId.toString() === req.body.productId.toString()
      );
      if (cartItemIndex >= 0) {
          console.log(typeof cart.cartItems[cartItemIndex].price)
        cart.cartItems[cartItemIndex].quantity =
        cart.cartItems[cartItemIndex].quantity + req.body.quantity;
        cart.cartItems[cartItemIndex].price = cart.cartItems[cartItemIndex].price + 
        req.body.price * req.body.quantity;
        cart.save((error, cart) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          }
          if (cart) {
            return res.status(200).json({
              cart,
            });
          }
        });
      } else {
        cart.cartItems.push(req.body)
        cart.save((error, cart) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          }
          if (cart) {
            return res.status(200).json({
              cart,
            });
          }
        });
      }
    } else {
      const cartItem = {
        productId:req.body.productId,
        price:req.body.price,
        quantity:req.body.quantity
        
      }
      const cart = new Cart({
        userId: req.user._id,
        cartItems: [cartItem],
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
