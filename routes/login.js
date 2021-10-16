const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
var UserModel = require('../models/usermodel');

router.post("/", async (req, res) => {
    let user = await UserModel.find({ email: req.body.email });
    if (!user) return res.status(400).send(invalidError);
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(invalidError);
  
    const token = user.generateAuthToken();
  
    res.send(token);
});

module.exports = router;