const router = require("express").Router();
const details = require('../Models/UserDetails')
const User = require('../Models/User');
const multer = require("multer");
const { connect } = require("mongoose");
const storage = multer.memoryStorage(); // Store in memory temporarily
const upload = multer({ storage });

router.get("", (req, res) => {
    res.send("details get")
})

router.patch("/editaccount", async (req, res) => {
    let { id, linkedin, github, discord } = req.body;

    await details.findOneAndUpdate({ user: id }, {
        accounts: {
            github: github,
            linkedin: linkedin,
            discord: discord
        }
    })
})

router.patch("/editplatform", async (req, res) => {
    let { leetUname, codeUname, gfgUname, id } = req.body;
    console.log("in")
    await details.findOneAndUpdate({ user: id }, {
        userNames: {
            leetcode: leetUname,
            codechef: codeUname,
            gfg: gfgUname
        }
    })

})

router.patch("/editprofile", async (req, res) => {
    let { email, username, phoneNo, country, id } = req.body;



    await details.findOneAndUpdate({ user: id }, {
        details: {
            country: country,
            contactNo: phoneNo
        }
    })

    await User.findByIdAndUpdate(id, {
        email: email,
        username: username
    })


})

router.post("/editphoto", upload.single('image'), async (req, res) => {
    
    // const image = new Image({
    //     image: req.file.buffer, // Save the binary data
    //     contentType: req.file.mimetype, // Save the MIME type

    //   });
    const { id } = req.body;

    if (req.file) {
        await details.findOneAndUpdate({ user: id }, {
            image: {
                buffer: req.file.buffer,
                contentType: req.file.contentType
            }
        })
    }

    for(let obj in req.body.formData){
        console.log(obj)
    }

}
)

module.exports = router;