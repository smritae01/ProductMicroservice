var mongoose = require("mongoose")
var Schema = mongoose.Schema

var UserSchema = new Schema({
  userId: { type: String, required: true }

});

module.exports = mongoose.model("user", UserSchema)
