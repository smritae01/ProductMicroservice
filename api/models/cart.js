const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    products: [
      {
        productId: Number,
        productName: String,
        quantity: Number,
        amount: Number
      }
    ]
  }
);

module.exports = mongoose.model("cart", CartSchema);
