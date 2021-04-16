'use strict';

var mongoose = require('mongoose'),
  Product = mongoose.model('product'),
  Cart = mongoose.model('cart');

exports.list_all_tasks = function(req, res) {
  Product.find({}, function(err, task) {
    if (err){
      res.send(err);
    }else{
    console.log(task);
    res.json(task);
  }
  });
};

exports.get_cart = function(req, res) {

  const userId = req.params.id;

  
  Cart.findById(userId, function(err, task) {
    if (err){
      res.send(err);
    }else{
    console.log(task);
    res.json(task);
  }
  });

};

// exports.update_a_task = function(req, res) {
//   Product.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
exports.put_cart = function(req, res) {

  const { productId, name, quantity, amount } = req.body;

  const userId = req.params.id; //TODO: the logged in user id

  try {
    let cart = Cart.findOne({ userId });
    let prod = Product.findOne({productId});

    let quant = prod.availableQuantity;

    if(quant!=0){
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, name, quantity, amount });
      }
      cart =  cart.save();
      return res.status(201).json(cart);
    } else {
      //no cart for user, create new cart
      const newCart =  Cart.create({
        userId,
        products: [{ productId, name, quantity, amount }]
      });

      return res.status(201).json(newCart);
    }
  }
  else{
    res.send("Product not available!");
  }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }


};
