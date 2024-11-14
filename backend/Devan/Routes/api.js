const router  = require("express").Router();
const User = require('../Models/User')
const UserDetails = require("../Models/UserDetails");
const getGFGdata = require("../Controllers/gfg");

router.get("/signup" , async(req,res) => {
    const users = await User.find();
    res.json(users);
})

router.post("/home" , async(req,res)=>{
    let {id} = req.body;
    console.log(id)
    if(id){
        const details = await UserDetails.findOne({user : id}).populate("user");
        // const user = await User.findById(id);
        // const 
        // const result = details.user.popo
        res.json(details)
    }else{
        res.json("user must login");
    }
})

router.post("/gfg" , async(req,res)=>{
    let {name} = req.body;
    const gfgdata = await getGFGdata(name);
    res.json(gfgdata);
})

module.exports = router;

