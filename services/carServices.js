var CarModel = require('../models/carmodel');
const crypto = require("crypto");
var BookingsModel = require('../models/bookingsModel');
var UserModel = require('../models/usermodel');

exports.addCar = async (req, res) => {
    const carId = crypto.randomBytes(16).toString("hex");
    const newCar = new CarModel({
        carId: carId,
        carLicenseNumber: req.body.carLicenseNumber,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        basePrice: req.body.carLicenseNumber,
        pph: req.body.manufacturer,
        securityDeposit: req.body.model,
        active: true
    });
    try {
        await newCar.save();
        res.status(200).json(newCar);
    } catch(error) {
        res.status(400).json({ message : error.message});
    }
};

exports.getCar = async (req, res) => {
    const carId = req.params.carId;
    try {
        const car = await CarModel.find({carId:carId});
        res.status(200).json(car);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

exports.updateCar = async (req, res) => {
    const carId = req.params.carId;
    try{
        await CarModel.findOneAndUpdate({
            carId: carId,
        },
        {   
            carLicenseNumber: req.body.carLicenseNumber,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            basePrice: req.body.carLicenseNumber,
            pph: req.body.manufacturer,
            securityDeposit: req.body.model,
            active: true
        }
        )
        res.status(202).json({carId: carId});
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

exports.deleteCar = async (req, res) => {
    const carId = req.params.carId;
    try {
        await CarModel.findOneAndUpdate({carId: carId}, { $set: {active: false }});
        res.status(203).json({carId:carId});
    }catch(error) {
        res.status(402).json({message: error.message});
    }
}


exports.getAllCars = async (req, res) => {
    var startingTime = Date.parse(req.query.toDateTime);
    var endingTime = Date.parse(req.query.fromDateTime);
    try{
        if(endingTime<startingTime){
            res.status(200).json({"msg": "Ending Time cannot be greater than ending"});
            return;
        }

        let carIds = await BookingsModel.find({
            $or: [
                {toDateTime:{$lt: ISODate(startingTime)}},
                {fromDateTime: {$gt:ISODate(endingTime)}}
            ]    
        });

        //Additional Filters added
        //Need to make it more cleaner
        let query = {};
        if(req.query.model){
            query['model'] = req.query.model;
        }

        if(query){
            let cars = await CarModel.find({
                carId : {$in: carIds}
            },{active: true}, query);
        }else {
            let cars = await CarModel.find({
                carId : {$in: carIds}
            },{active: true});
        }
        res.status(200).json(cars);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

exports.calculatePrice = async (req, res) => {
    var startingTime = Date.parse(req.query.toDateTime);
    var endingTime = Date.parse(req.query.fromDateTime);
    var carId = req.query.carId
    try{
        if(endingTime<startingTime){
            res.status(200).json({message: "Ending Time cannot be greater than ending"});
            return;
        }
        let car = await CarModel.find({carId: carId}, { active: { $eq:  true} });
        if(!car){
            res.status(200).json({message: "Car Not available"});
        }
        let hours = (endingTime - startingTime) / 3600000;
        let deposit = car.securityDeposit ? car.securityDeposit : 0;
        let basePrice = car.basePrice ? car.basePrice : 0;
        let pph = car.pph ? car.pph*hours : 0;
        let price = deposit + basePrice + pph;
        res.status(200).json(price);
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}


exports.getAllBookings = async (req, res) => {
    const carId = req.params.carId;
    try {
        let userIds = await BookingsModel.find({carId:carId}).select('userId');
        let users = await UserModel.find({userId:{$in: userIds}});
        res.status(200).json(users);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

exports.bookCar = async (req, res) => {
    const carId = req.params.carId;
    var startingTime = Date.parse(req.query.toDateTime);
    var endingTime = Date.parse(req.query.fromDateTime);
    const userId = req.query.userId;
    try {
        //check if car available
        if(endingTime<startingTime){
            res.status(200).json({message: "Ending Time cannot be greater than ending"});
            return;
        }
        let car = await CarModel.find({carId: carId}, { active: { $eq:  true} });
        if(!car){
            res.status(200).json({message: "Car Not available"});
        }
        //Update car Booking
        let hours = (endingTime - startingTime) / 3600000;
        let deposit = car.securityDeposit ? car.securityDeposit : 0;
        let basePrice = car.basePrice ? car.basePrice : 0;
        let pph = car.pph ? car.pph*hours : 0;
        let price = deposit + basePrice + pph;
        const newBooking = new BookingsModel({
            userId: userId,
            carId: carId,
            price: price,
            toDateTime: ISODate(startingTime),
            fromDateTime: ISODate(endingTime)
        });
        await newBooking.save();
        res.status(200).json(newBooking);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}