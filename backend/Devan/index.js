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
const mongoStore = require('connect-mongo')

const session = require('express-session');

let userId = '';


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

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
const corsopt = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}

app.use(cors(corsopt));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



app.listen(port, () => {
    console.log("app is starting");
})


app.get("/api/signup", async (req, res) => {
    const data = await User.find();
    console.log("in home get")
    res.send(data)
})

app.post("/signup", async (req, res) => {
    const { uname, email, pass, last_char } = req.body;
    console.log(req.body);
    let final = pass;
    const user = await User.create({
        userName: uname,
        emailId: email,
        password: final
    })

    await user.save();
    let data = await User.findOne({
        $or:
            [
                { emailId: email },
                { userName: email }
            ]
    });
    userId = data._id.toString();


    console.log("successfull", userId)
    await mailforSignup(email)
})


app.get("/api/login", async (req, res) => {

    const data = await User.find();
    // console.log(data)
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
    console.log("in")

    userId = data._id.toString();
    console.log(userId)
})


app.get("/api/home", async (req, res) => {

    // console.log("Home: session.userid is", req.session.userName);  // Log the session ID
    if (userId) {
        const data = await User.findById(userId);
        res.send(data)
    } else {
        res.json({ data: "backend" })
    }

})

app.post("/data", async (req, res) => {
    console.log(req.body);
    let { UserName } = req.body;
    const data = await User.findOne({ userName: UserName });
    userId = data._id.toString();
    console.log(userId)
})

app.post("/logout", (req, res) => {
    userId = '';
})

app.post("/forgetpassword", async (req, res) => {
    let { emailId } = req.body;
    const data = await User.findOne({ emailId: emailId });
    userId = data._id.toString();
    // console.log(userId)
    await sendMail(emailId);
})

app.get("/api/resetpassword", async (req, res) => {
    const data = await User.findOne({ _id: userId });
    // console.log(data);
    let obj = {
        userName: data.userName,
        email: data.emailId
    }

    res.json(obj);
})

app.patch("/changepassword", async (req, res) => {
    let { password } = req.body;
    console.log(password, req.body)

    let update = await User.findByIdAndUpdate(userId, {
        password: password
    })

    console.log("sucess");
});


app.patch("/editProfile", async (req, res, next) => {
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
})

app.patch("/editAccount", async (req, res, next) => {
    let { email, linkedin, github, discord } = req.body;

    await User.findOneAndUpdate({ emailId: email }, {
        accounts: {
            github: github,
            linkedlin: linkedin,
            discord: discord,
        }
    })

    res.send("successfull")
})

app.post("/editprofile/editPlatformPage", async (req, res) => {
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

})