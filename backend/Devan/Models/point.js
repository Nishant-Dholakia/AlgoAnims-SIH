const mongoose = require('mongoose');

const PointSchema = mongoose.Schema({
    userName : String,
    emailId : String,

})

const Points = mongoose.model('Point' , PointSchema);