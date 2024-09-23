const express = require('express');
const cors  = require('cors');
const gfgData = require('./Controllers/gfg');
const codechefData = require('./Controllers/codechef');
const leetcodeData = require('./Controllers/leetcodeData');
const port = 8080;
const mongoose = require('mongoose');
const User = require('./Models/signup');

async function connection(){
    await mongoose.connect('mongodb+srv://AlgoAnims:sih-AlgoAnims-2024@cluster0.ettpzze.mongodb.net/');
}

connection()
.then(()=>{
    console.log("connection sucessfully");
})
.catch((err)=>{
    console.log(err)
})

const app = express();
const corsopt = {
    origin : "http://localhost:5173",
}
app.use(cors(corsopt));
app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.listen(port , ()=>{
    console.log("app is starting");
})

app.get("/home",(req,res)=>{
    res.json({mess : "hi"});
})
app.get("/editprofile" , (req,res)=>{
    res.json({mess : "no"})
})
app.get("/editprofile/editPlatformPage",(req,res)=>{
    res.json({mess : "welcome"})
})

app.post("/editprofile/editPlatformPage" , async(req,res)=>{
    const {leetcodeUname , codechefUname , gfgUname} = req.body;

    const leetcode = await leetcodeData(leetcodeUname);
    const codechef = await codechefData(codechefUname);
    const gfg = await gfgData(gfgUname);
    
    res.json({leetcode , codechef , gfg});

})

app.post("/signup",(req,res)=>{
    
})
