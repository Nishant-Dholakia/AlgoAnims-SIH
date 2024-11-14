const router  = require("express").Router();
const details = require('../Models/UserDetails')
const User = require('../Models/User')


router.get("" , (req,res) => {
    res.send("details get")
})

router.patch("/editaccount" , async(req,res) => {
    let {id , linkedin , github , discord} = req.body;
    
    await details.findOneAndUpdate({user : id} , {
        accounts : {
            github : github,
            linkedin : linkedin,
            discord : discord
        }
    })
})

router.patch("/editplatform" , async(req,res) => {
    let {leetUname, codeUname, gfgUname , id} = req.body;
    console.log("in")
    await details.findOneAndUpdate({user : id} , {
        userNames : {
            leetcode : leetUname,
            codechef : codeUname,
            gfg : gfgUname
        }
    })

})

router.patch("/editprofile" ,async(req,res) => {
  let {email , username ,phoneNo , country  , id} = req.body;



  await details.findOneAndUpdate({user : id} , {
    details : {
        country : country,
        contactNo : phoneNo
    }
  })

  await User.findByIdAndUpdate(id , {
    email : email,
    username : username
  })

  
})

module.exports = router;