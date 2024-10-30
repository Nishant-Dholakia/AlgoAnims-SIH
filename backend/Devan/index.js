const express = require('express');

const cors = require('cors');
const gfgData = require('./Controllers/gfg');
const codechefData = require('./Controllers/codechef');
const leetcodeData = require('./Controllers/leetcodeData');
const port = 8080;
const mongoose = require('mongoose');
const User = require('./Models/data');
const sendMail = require('./Controllers/forgetPassword');
const mailforSignup = require('./Controllers/mail');
const asyncWrap = require('./utils/asyncWrap');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const ExpressError = require('./utils/ExpressError')

const key = 'sih-algoanims'


async function connection() {
    await mongoose.connect('mongodb+srv://AlgoAnims:sih-AlgoAnims-2024@cluster0.ettpzze.mongodb.net/AlgoAnims');
    // await mongoose.connect('mongodb://localhost:27017/AlgoAnims');
}

connection()
    .then(() => {
        console.log("connection sucessfully");
    })
    .catch((err) => {
        console.log(err)
    })

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174' , 'http://localhost:5175'];
const corsopt = {
    origin : allowedOrigins,
    credentials : true
}

app.use(cors(corsopt));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

const checkToken = (req,res,next) => {
    let token = req.cookies.token;
    if(!token){
        return res.json('token is not avaliable');
        
    }
    
    jwt.verify(token , key ,(err , decode)=>{
        if(err) return res.json('not found')
        
        req.user = decode;
        // console.log(req.user);
        next();
    })
}


app.get("/api/signup",asyncWrap(async (req, res,next) => {
    const data = await User.find();
    console.log("in home get")
    res.send(data)
}))

app.post("/signup", asyncWrap(async (req, res,next) => {
    const { uname, email, pass, last_char } = req.body;
    console.log(req.body);
    let final = pass;
    const user = await User.create({
        userName: uname,
        emailId: email,
        password: final
    })

    await user.save();
    
    await mailforSignup(email)
}))


app.get("/api/login", asyncWrap(async (req, res,next) => {

    const data = await User.find();
    // console.log(data)
    res.json(data);
}))

app.post("/login", asyncWrap(async (req, res,next) => {
    let { email } = req.body;
    let data = await User.findOne({
        $or:
            [
                { emailId: email },
                { userName: email }
            ]
    });
    // console.log("in")

    const token = jwt.sign({id : data._id, email : data.emailId , userName : data.userName} ,key , {
        expiresIn : '2d'
    })
    // console.log(token); 

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })
    res.json(token);

}))


app.get("/api/home", checkToken , asyncWrap(async (req, res,next) => {
    let user = req.user;
    // console.log(user.id)
    if(user){
        const data = await User.findById(user.id);
        return res.json(data);
    }

    return res.json('wrong')

}))


app.post("/logout", (req, res) => {
    res.clearCookie('token',{ httpOnly: true, secure: true, sameSite: 'strict' });
    return res.send('logout')
})

app.post("/forgetpassword", asyncWrap(async (req, res,next) => {
    let { emailId } = req.body;
    const data = await User.findOne({ emailId: emailId });
    await sendMail(emailId);
}))

app.get("/api/resetpassword", asyncWrap(async (req, res,next) => {
    if(!req.user){
        return res.json('jay0yai')
    }
    const data = await User.findById(req.user.id);
    // console.log(data);
    let obj = {
        userName: data.userName,
        email: data.emailId
    }

    res.json(obj);
}))

app.patch("/changepassword",asyncWrap( async (req, res,next) => {
    let { password } = req.body;
    // console.log(password, req.body)
    if(!req.user){
        return res.json('jay0yai')
    }
    let update = await User.findByIdAndUpdate(req.user.id, {
        password: password
    })

    console.log("sucess");
}));


app.patch("/editProfile", asyncWrap(async (req, res, next) => {
    let { email, username, country, phoneNo } = req.body;
    // console.log(req.body)

    await User.findOneAndUpdate({ emailId: email }, {
        userName: username,
        details: {
            country: country,
            contactNo: phoneNo,
        }
    })

    res.send("sucessfully")
}))

app.patch("/editAccount", asyncWrap(async (req, res, next) => {
    let { email, linkedin, github, discord } = req.body;

    await User.findOneAndUpdate({ emailId: email }, {
        accounts: {
            github: github,
            linkedlin: linkedin,
            discord: discord,
        }
    })

    res.send("successfull")
}))

app.post("/editprofile/editPlatformPage", asyncWrap(async (req, res,next) => {
    const { leetcodeUname, codechefUname, gfgUname, email } = req.body;

    const leetcode = await leetcodeData(leetcodeUname);
    const codechef = await codechefData(codechefUname);
    const gfg = await gfgData(gfgUname);
    const data = await User.findOneAndUpdate({ emailId: email }, {
        userNames: {
            leetcode: leetcodeUname,
            codechef: codechefUname,
            gfg: gfgUname
        }
    })
    res.json({ leetcode, codechef, gfg });

}))

app.post("/api/gfg" , async(req,res) => {
    let {name} = req.body;
    const gfg = await gfgData(name);
    res.send(gfg);
})

app.use((err,req,res)=>{
    let {status , message} = err
    res.staus(status).json(message);
})



app.listen(port, () => {
    console.log("app is starting");
})
