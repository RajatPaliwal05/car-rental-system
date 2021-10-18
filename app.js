const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const users = require('./routes/users');
const cars = require('./routes/cars');
const login = require('./routes/login');
const mongo = require('./services/mongo');



app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', users);
app.use('/car', cars);
app.use('/login', login);

let server = app.listen(3000, function(){
    console.log('Car Rental service is up and running on port 3000 !!!');
});