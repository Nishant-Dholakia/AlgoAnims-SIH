const User = require("../Models/User");
const UserDetails = require("../Models/UserDetails")
const UserScore = require("../Models/UserScore");
const passport = require('passport');

const router = require("express").Router();
const sendMail = require('../Controllers/mail')

let email = "";

router.post("/signup", async (req, res) => {
    try {
        let { uname, email, password } = req.body;

        let newUser = new User({
            email: email,
            username: uname
        })

        const user = await User.register(newUser, password)

        req.login(user ,(err)=> {
            if(err) return res.json({err})  
        })
       
        if(user){
            const newDetails = new UserDetails({
                user : user,
                username : user.username
            })

            const newScore = new UserScore({
                user : user,
            })

            await newScore.save()

            await newDetails.save();
            
            
        }

        res.json({msg : "signup successfull"})
    } catch (error) {
        res.json(error)
    }
})

router.get("/login" , (req,res) => {
    res.json("user is not found!");
})

router.post("/login",passport.authenticate("local", {
    failureRedirect: '/user/login',
}) , (req,res) => {
    res.json(req.user)
})


router.post("/logout" , (req,res)=>{
    req.logOut((err)=>{
        if(err) return res.json(err)
        res.json("user logout!");
    })
})

router.post("/forgetform" , async(req,res) => {
    let {username , password , email} = req.body;
    const user = await User.findOne({email : email});
    console.log(user)
    if(username){
        await sendMail(email , "forget username" , "show your username",
            `<h1>UserName : ${user.username} </h1><br><h1>email : ${email}</h1>`
        )
    }else{
        email = email;
        console.log(email);
        await sendMail(email , "forget password" , "change your password" , `<h1>pls click on this link : <a href='http://localhost:5173/login/forgetpassword/changepassword?email=${email}'>Change password</a>`)
    }
})

router.patch("/changepassword" , async(req,res) => {
    let {password ,email} = req.body;
    if(email){
        const user = await User.findOne({email : email});
        user.password = password;
        await user.save();
        res.json("password changed successfully")
    }
})

router.post("/getuser" , async(req,res) => {
    let {email} = req.body;
    console.log(email , req.query , req.params);
    if(email){
        const user = await User.findOne({email : email});
        res.json(user)
    }else{
        res.json("user not found")
    }
})

module.exports = router;