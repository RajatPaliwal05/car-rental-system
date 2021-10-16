const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BookingsModelSchema =new Schema({
    userId: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10
    },
    carId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    toDateTime: {
        type: Date
    },
    fromDateTime: {
        type: Date
    }
});
module.exports = mongoose.model('BookingsModel', BookingsModelSchema );