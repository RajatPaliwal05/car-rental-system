const express = require('express');
const router = express.Router();
const car = require('../services/carServices');

router.post('/', async function (req, res) {
    if (req.body) {
        try {
            const result = await car.addCar(req, res);
            res.status(200).send(result);
        } catch (error) {
            console.log('Error while adding the Car :::: ' + error.stack);
            res.status(400).send({ "err": error.message });
        }
    } else {
        res.status(400).send({ err: "Input field is missing" });
    }
});

router.get('/:carId', async function (req, res) {
    if (!req.params.carId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const result = await car.getCar(req, res);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error while adding the Car :::: ' + error.stack);
        res.status(400).send({ "err": error.message });
    }
});

router.put('/:carId', async function (req, res) {
    if (!req.params.carId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const result = await car.updateCar(req, res);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error while adding the Car :::: ' + error.stack);
        res.status(400).send({ "err": error.message });
    }
});

router.delete('/:carId', async function (req, res) {
    if (!req.params.carId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const result = await car.deleteCar(req, res);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error while adding the Car :::: ' + error.stack);
        res.status(400).send({ "err": error.message });
    }
});

router.get('/search-cars', async function (req, res) {
    if (req.query.toDateTime && req.query.fromDateTime) {
        try {
            const result = await car.getAllCars(req, res);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ "err": error.message });
        }
    } else {
        res.status(400).send({ err: "Input field is missing" });
    }
});

router.get('/calculate-price', async function (req, res) {
    if (req.query.carId && req.query.toDateTime && req.query.fromDateTime) {
        try {
            const result = await car.calculatePrice(req, res);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ "err": error.message });
        }
    } else {
        res.status(400).send({ err: "Input field is missing" });
    }
});

router.get('/:carId/bookings', async function (req, res) {
    if (req.params.carId) {
        try {
            const result = await car.getAllBookings(req, res);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ "err": error.message });
        }
    } else {
        res.status(400).send({ err: "Input field is missing" });
    }
});

router.post('/:carId/book', async function (req, res) {
    if (req.params.carId && req.query.durations) {
        try {
            const result = await car.bookCar(req, res);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ "err": error.message });
        }
    } else {
        res.status(400).send({ err: "Input field is missing" });
    }
});

module.exports = router;