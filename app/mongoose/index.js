const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dotenv=require('dotenv');
dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.url;


db.responses = require("../brokersresponse/brokersresponse.model.js")(mongoose);
db.brokers = require("../brokers/brokers.model.js")(mongoose);
db.profiles = require("../members/members.model.js")(mongoose);
db.auths = require("../members/auth.model.js")(mongoose);
module.exports = db;
