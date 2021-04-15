'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  productId: {
    type: String
  },
  category: {
    type: String
  },
  productName: {
    type: String
  },
  price: {
    type: Number
  },
  availableQuantity: {
    type: Number
  }
});


module.exports = mongoose.model('Products', ProductSchema);
