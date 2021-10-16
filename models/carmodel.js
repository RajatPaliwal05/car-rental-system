const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CarModelSchema =new Schema({
    carId: {
        type: String,
        required: true,
        unique: true
    },
    carLicenseNumber: {
      type: String,
      required: true,
      unique: true
    },
    manufacturer: {
      type: String
    },
    model: {
        type: String
    },
    basePrice: {
        type: Number,
        required: true
    },
    pph: {
        type: Number,
        required: true
    },
    securityDeposit: {
        type: Number
    },
    active: {
        type: Boolean,
        required: true
    }
});
module.exports = mongoose.model('CarModel', CarModelSchema );

