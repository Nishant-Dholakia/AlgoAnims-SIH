const express = require('express');
const cors  = require('cors');
const gfgData = require('./Controllers/gfg');
const codechefData = require('./Controllers/codechef');
const leetcodeData = require('./Controllers/leetcodeData');


const app = express();
const corsopt = {
    origin : "http://localhost:5173",
}
app.use(cors(corsopt));
app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.listen(3000 , ()=>{
    console.log("app is starting");
})

app.get("/home",(req,res)=>{
    res.json({mess : "hi"});
})

app.post("/editPlateformpage" , (req,res)=>{
    const {leetcodeUname , codechefUname , gfgUname} = req.body;

    const leetcode = leetcodeData(leetcodeUname);
    const codechef = codechefData(codechefUname);
    const gfg = gfgData(gfgUname);
    
    res.json({leetcode , codechef , gfg});

})
