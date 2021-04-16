const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {type:String},

    products: [
      {
        productId: String,
        productName: String,
        quantity: Number,
        amount: Number
      }
    ]
  }, {collection: 'cart'});

module.exports = mongoose.model("cart", CartSchema);
