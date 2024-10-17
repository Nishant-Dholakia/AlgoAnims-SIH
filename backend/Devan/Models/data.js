const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName : String,
    emailId : String,
    password : String,

    details : {
        country : {
            type : String,
            default : "India"
        },
        contactNo : {
            type : Number,
            default : null,
        }

    },
    accounts : {
        github : {
            type : String,
            default : ""
        },
        linkedlin : {
            type : String,
            default : ""
        },
        discord : {
            type : String,
            default : ""
        }
    },
    userNames : {
        leetcode : {
             type : String,
            default : ""
        },
        codechef : {
             type : String,
            default : ""
        },
        gfg : {
             type : String,
            default : ""
        }
    }

})

const User = mongoose.model("User" , UserSchema);

module.exports = User;


