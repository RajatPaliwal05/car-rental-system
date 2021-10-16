const express = require('express');
const router = express.Router();
const user = require('../services/userService');

router.post('/', async function (req, res) {
    if (!req.body.mobileNo) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const result = await user.addUser(req);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error while adding the User :::: ' + error.stack);
        res.status(400).send({ "err": error.message });
    }
});

router.get('/:userId', async function (req, res) {
    if (!req.params.userId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const result = await user.getUser(req);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error while adding the User :::: ' + error.stack);
        res.status(400).send({ "err": error.message });
    }
});

router.put('/:userId', async function (req, res) {
    if (!req.params.userId && !req.body.mobileNo) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const result = await user.updateUser(req);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error while adding the User :::: ' + error.stack);
        res.status(400).send({ "err": error.message });
    }
});

router.delete('/:userId', async function (req, res) {
    if (!req.params.userId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const result = await user.deleteUser(req);
        res.status(200).send(result);
    } catch (error) {
        console.log('Error while adding the User :::: ' + error.stack);
        res.status(400).send({ "err": error.message });
    }
});

router.get('/:userId/bookings', async function (req, res) {
    if (req.params.userId) {
        try {
            const result = await user.getBookings(req);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send({ "err": error.message });
        }
    } else {
        res.status(400).send({ err: "Input field is missing" });
    }
});


module.exports = router;