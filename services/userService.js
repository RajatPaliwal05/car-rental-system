var UserModel = require('../models/usermodel');
const crypto = require("crypto");
var BookingsModel = require('../models/bookingsModel');

exports.addUser = async(req, res) => {
    const userId = crypto.randomBytes(16).toString("hex");
    const newUser = new UserModel({
      mobile: req.body.mobileNo,
      name: req.body.name,
      userId: userId
    });
    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch(error) {
        res.status(400).json({ message : error.message});
    }
};

exports.getUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await UserModel.find({userId:userId});
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        await UserModel.findOneAndUpdate({
            userId: userId,
        },
        {   
            mobile: req.body.mobileNo,
            name: req.body.name,
        }
        )
        res.status(202).json({userId: userId});
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        await UserModel.findOneAndUpdate({userId: userId},{active:false});
        res.status(203).json({userId:userId});
    }catch(error) {
        res.status(402).json({message: error.message});
    }
}


exports.getBookings = async (req,res) => {
    const userId = req.params.userId;
    try {
        const bookings = await BookingsModel.find({userId:userId});
        res.status(200).json(bookings);
    }catch(error) {
        res.status(404).json({message: error.message});
    }
}