const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dotenv=require('dotenv');
dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.url;


db.responses = require("../brokersresponse/brokersresponse.model.js")(mongoose);


module.exports = db;
