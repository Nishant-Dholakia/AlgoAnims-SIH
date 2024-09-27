const express = require('express');

const cors = require('cors');
const gfgData = require('./Controllers/gfg');
const codechefData = require('./Controllers/codechef');
const leetcodeData = require('./Controllers/leetcodeData');
const port = 8080;
const mongoose = require('mongoose');
const User = require('./Models/data');
const mail = require('./Controllers/mail');
const mailforSignup = require('./Controllers/mail');

const session = require('express-session');

let userId = '';

async function connection() {
    await mongoose.connect('mongodb://localhost:27017/AlgoAnims');
}

connection()
    .then(() => {
        console.log("connection sucessfully");
    })
    .catch((err) => {
        console.log(err)
    })

const app = express();

const corsopt = {
    origin: "http://localhost:5173",
}
app.use(cors(corsopt));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(session({
    secret : "#sih-2024",
    resave  :false,
    saveUninitialized : true,
    cookie : {secure : false}
}));

app.listen(port, () => {
    console.log("app is starting");
})


app.get("/editprofile", (req, res) => {
    res.json({ mess: "no" })
})
app.get("/editprofile/editPlatformPage", (req, res) => {
    res.json({ mess: "welcome" })
})

app.post("/editprofile/editPlatformPage", async (req, res) => {
    const { leetcodeUname, codechefUname, gfgUname } = req.body;

    const leetcode = await leetcodeData(leetcodeUname);
    const codechef = await codechefData(codechefUname);
    const gfg = await gfgData(gfgUname);
    console.log(leetcode , codechef , gfg)

    res.setHeader('Content-Type', 'application/json');
    await User.findByIdAndUpdate(userId , {
        userNames:{
            leetcode : leetcode,
            codechef  : codechef,
            gfg : gfg
        }
    })
res.json({ leetcode, codechef, gfg });

})
app.get("/signup" , async(req,res)=>{
    const data = await User.find();
    res.send(data)
})

app.post("/signup", async (req, res) => {
    const { uname, email, pass, last_char } = req.body;
    console.log(req.body);
    let final = pass + last_char;
    await mailforSignup(email)
    const user = await User.create({
        userName: uname,
        emailId: email,
        password: final
    })

    user.save();
    let data = await User.findOne({
        $or:
            [
                { emailId: email },
                { userName: email }
            ]
    });
    userId = data._id.toString();
})


app.get("/login", async (req, res) => {
    const data = await User.find();
    res.json(data);
})

app.post("/login", async (req, res) => {
    let { email } = req.body;
    let data = await User.findOne({
        $or:
            [
                { emailId: email },
                { userName: email }
            ]
    });
    
    // if(data){
    //     req.session.userid = data._id.toString();
    //     async function hm(){
    //         await req.session.save();
    //     }
    //     hm();
    //     console.log(req.session.userid);
    // }
    userId = data._id.toString();
})


app.get("/home", async (req, res) => {
    // console.log("Home: session.userid is", req.session.userid);  // Log the session ID
    if (userId) {
        const data = await User.findById(userId);
        res.send(data)
    }else{
        res.json({ data: "backend" })
    }

})