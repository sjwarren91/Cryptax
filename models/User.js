var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 24
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 24
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;