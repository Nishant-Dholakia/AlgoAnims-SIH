const mongoose = require('mongoose');

const score = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    sort : [{
        qname : String,
        score : {
            type : Number,
            default : 0
        }
    }],
    search : [{
        qname : String,
        score : {
            type : Number,
            default : 0
        }
    }],
    tree : [{
        qname : String,
        score : {
            type : Number,
            default : 0
        }
    }],
    graph : [{
        qname : String,
        score : {
            type : Number,
            default : 0
        }
    }],
    binarysearchtree : [{
        qname : String,
        score : {
            type : Number,
            default : 0
        }
    }],

    totalscore : [{
        topic : String,
        score : {
            type : Number,
            default : 0
        }
    }],

    finalScore : {
        type : Number,
        default : 0
    }
})

module.exports = new mongoose.model("Userscore" , score);