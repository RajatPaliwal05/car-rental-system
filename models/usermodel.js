const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserModelSchema =new Schema({
    userId: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 60,
      maxlength: 60
    },
    active: {
      type: Boolean,
      required: true
    }
});

//To generate access Token
UserModelSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("JWT_PRIVATE_KEY")
  );
  return token;
};
module.exports = mongoose.model('UserModel', UserModelSchema );