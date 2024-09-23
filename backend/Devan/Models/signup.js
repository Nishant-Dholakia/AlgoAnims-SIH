const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId : Number,
    userName : String,
    emailId : String,
    password : String,
})

const User = mongoose.model("User" , UserSchema);

module.exports = User;


