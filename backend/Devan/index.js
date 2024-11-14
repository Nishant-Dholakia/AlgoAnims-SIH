if(process.env.NODE_ENV != 'production'){
    require("dotenv").config()
}



const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const LocalStrategy = require('passport-local')
const cors = require('cors');
const User = require('./Models/User');

const passport = require('passport')
const apiRouter = require("./Routes/api")
const detailsRouter = require("./Routes/details")
const userRouter = require("./Routes/user")
const scoreRouter = require("./Routes/score")

const app = express();


const sessionOtp = {
    secret: "ALGOANIMS1234SIHPROJECT",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 3600 * 1000,
        maxAge: 7 * 3600 * 1000,
        httpOnly: true
    }
}

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174' , 'http://localhost:5175'];
const corsopt  = {
    origin : allowedOrigins,
    credentials : true 
}

app.use(session(sessionOtp));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors(corsopt))


//passport js
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})


app.use("/api" , apiRouter);
app.use("/user" , userRouter);
app.use("/details" , detailsRouter);
app.use("/score" , scoreRouter);



app.use((err,req,res,next) => {
    if(err.message) res.json(err.message);
    else res.json(err); 
})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});




async function connection(){
    mongoose.connect('mongodb://localhost:27017/AlgoAnims');
}

connection()
.then(()=>{console.log("connection sucessfull")})
.catch((err)=>{console.log(err)})