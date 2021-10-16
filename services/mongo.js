var mongoose = require('mongoose');
const config = require('../config/config');
var mongoConfig = config.mongo.host + ':' + config.mongo.port;
var mongoDB = 'mongodb://' + mongoConfig;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));