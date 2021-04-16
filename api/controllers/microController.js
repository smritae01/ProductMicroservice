'use strict';
// {
//     "productId" : "12900dsd234",
//     "quantity" : 2
// }
var mongoose = require('mongoose'),
  Product = mongoose.model('product'),
  Cart = mongoose.model('cart');
mongoose.set('useFindAndModify', false);


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

  Cart.findOne({userId: userId}, function(err, task) {
    if (err){
      res.send(err);
    }else{

    res.json(task);


  }
  });

};


// exports.put_cart = function(req, res) {
//
//   var { productId, quantity} = req.body;
//   quantity = parseInt(quantity);
//
//   const userId = req.params.id; //TODO: the logged in user id
//   var ui=0;
//   userids = ["smrt123", "rahul087", "raghu901"];
//
//   for (var u in userids) {
//     if (userId==u){
//       ui=1;
//       break;
//     }
//   }
//   if(ui==0){
//     console.log("Invalid UserID!");
//   }else{
//     console.log("User Validated!");
//   }
//
//       var flag=0;
//       var flaga=0;
//       var cart;
//       let prodids = [];
//       let quantids = [];
//       let nameids = [];
//       let amtids = [];
//       // prodids = task.products.map(({productId})=>productId);
//       // nameids = task.products.map(({productName})=>productName);
//       // quantids = task.products.map(({quantity})=>quantity);
//       // amtids = task.products.map(({amount})=>amount);
//
//   let cartt = Cart.findOne({ userId:userId}, function(err, task) {
//     if (err){
//       res.send(err);
//     }else{
//       flag=1;
//
//   }
//   });
//
//   let prod = Product.findOne({productId: productId}, function(err, task) {
//     if (err){
//       res.send(err);
//     }else{
//       flaga=1;
//       res.json(task);
//   }
//   });
//       //cart exists for user
//
//       let itemIndex = cartt.products.findIndex(p => p.productId == productId);
//
//       if (itemIndex > -1) {
//         //product exists in the cart, update the quantity
//         let productItem = cartt.products[itemIndex];
//         productItem.quantity += quantity;
//         productItem.amount += prod.price;
//         cartt.products[itemIndex] = productItem;
//
//       } else {
//         //product does not exists in cart, add new item
//         cartt.products.push({userId:userId,products:[{ productId:productId, productName:name, quantity: quantity, amount:price}]});
//       }
//       cartt =  cartt.save();
//       return res.status(201).json(cartt);
//
//   // }
//   // else{
//   //   res.send("Product not available!");
//   // }
//
// };

exports.update_cart = function(req, res) {

  const userId=req.params.id;
  var temp = req.body;
  var tt = temp.quantity;
  var new_quant = parseInt(tt);
  var temp1 = req.body;
  var prod_id = temp1.productId;
  var prod_price;
  var prod_quant;

    Cart.findOne({userId:userId}, function(err, task) {
      if (err){
        res.send(err);
      }else{

        Product.findOne({productId: prod_id}, function(err, obj){
          if(err)
            res.send(err);
            else{

            prod_price=obj.price;
            prod_quant=obj.availableQuantity;
            prod_name = obj.productName;
            prod_amt = obj.price;
            if(new_quant>prod_quant){
              // console.log("Product not available!");
              res.send("Product out of stock!");
            }
        else{
          var quantarr=[];
          var amtarr = [];
          var namearr=[];
          quantarr= task.products.map(({quantity})=>quantity);
          amtarr = task.products.map(({amount})=>amount);
          namearr = task.products.map(({productName})=>productName);
          prodarr = task.products.map(({productId})=>productId);
          if(prodarr[0]!=prod_id){
            let newCart = new Cart({userId: userId, products:[{productId: prod_id,
                            productName: prod_name,
                            quantity: new_quant,
                            amount: prod_amt}]});
            newCart.save((err, cart)=>{
              if(err)
                res.send(err);
              else{
                res.json(cart);
              }
            });
          }
          var newamt;
        newamt= parseInt(amtarr[0])+(prod_price*new_quant);
        prod_quant=prod_quant-new_quant;
        console.log(newamt, prod_price, new_quant);
        const update = {products:[{productId: prod_id,
                        productName: namearr[0],
                        quantity: quantarr[0]+parseInt(new_quant),
                        amount: newamt}]};
        Cart.findOneAndUpdate({userId: userId}, update, {new: true}, function(err, task1) {
          if (err)
            res.send(err);
          res.json(task1);

        });
      }
    }
    });
  }
  });
};
