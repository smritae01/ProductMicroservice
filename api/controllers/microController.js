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
    // console.log(task);
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


exports.update_cart = function(req, res) {

  const userId=req.params.id;
  var temp = req.body;
  var tt = temp.quantity;
  var new_quant = parseInt(tt);
  var temp1 = req.body;
  var prod_id = temp1.productId;
  var prod_price;
  var prod_quant;
  var prod_name;

  let cartvar = Cart.findOne({userId:userId}, function(err, task) {
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

            if(new_quant>prod_quant){
              // console.log("Product not available!");
              res.send("Product out of stock!");
            }
        else{
          var quantarr=[];
          var amtarr = [];
          var namearr=[];
          var prodarr=[];
          quantarr= task.products.map(({quantity})=>quantity);
          amtarr = task.products.map(({amount})=>amount);
          namearr = task.products.map(({productName})=>productName);
          prodarr = task.products.map(({productId})=>productId);
          prod_quant=prod_quant-new_quant;
          var prod_up = {availableQuantity: prod_quant}
          if(prodarr[0]!=prod_id){
            var to_push = {productId: prod_id,
                            productName: prod_name,
                            quantity: new_quant,
                            amount: prod_price};
        Cart.findOneAndUpdate({ userId: userId },{ $push: {products: to_push}}, {new: true}, function(err, carrt){
                 if(err)
                   res.send(err);
                 else{
                   res.json(carrt);
                 }
               });

        Product.findOneAndUpdate({productId: prod_id}, prod_up);
      }else{

        var newamt;
        newamt= parseInt(amtarr[0])+(prod_price*new_quant);

        // console.log(newamt, prod_price, new_quant);
        const update = {products:[{quantity: quantarr[0]+parseInt(new_quant),
                        amount: newamt}]};
        Product.findOneAndUpdate({productId: prod_id}, prod_up);
        Cart.findOneAndUpdate({userId: userId}, update, {new: true}, function(err, task1) {
          if (err)
            res.send(err);
          res.json(task1);

        });
      }
      }
    }
    });
  }
  });
};
