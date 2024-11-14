const mongoose = require('mongoose');

const UserDeatilsSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
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
        linkedin : {
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

module.exports = mongoose.model("Userdetail" , UserDeatilsSchema);



