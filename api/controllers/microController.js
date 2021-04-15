'use strict';


var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

  // const prod1 = new Product({
  //   productId: "12445dsd234",
  //   category: "Mobile",
  //   productName: "Samsung",
  //   price: 800,
  //   availableQuantity: 10
  // });
  //
  // const prod2 = new Product({
  //   productId: "12340dsd234",
  //   category: "TV",
  //   productName: "SONY",
  //   price: 10800,
  //   availableQuantity: 7
  // });

exports.list_all_tasks = function(req, res) {
  Product.collection("products").find({}).toArray(function(err, task) {
    if (err){
      res.send(err);
    }else{
    console.log(task);
    res.json(task);
  }
  });
};

// exports.create_a_task = function(req, res) {
//   var new_task = new Product(req.body);
//   new_task.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
//
//
// exports.read_a_task = function(req, res) {
//   Product.findById(req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
//
//
// exports.update_a_task = function(req, res) {
//   Product.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
//
//
// exports.delete_a_task = function(req, res) {
//
//
//   Product.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Product successfully deleted' });
//   });
// };
