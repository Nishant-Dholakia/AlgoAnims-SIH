const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3020;

const app = express();


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

mongoose.connect('mongodb://localhost:27017/user')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    });


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);


app.get('/signup', (req, res) => {
    console.log('Serving signup page');
    res.sendFile(path.join(__dirname, 'signup.html')); 
});


app.get('/login', (req, res) => {
    console.log('Serving login page');
    res.sendFile(path.join(__dirname, 'login.html')); 
});


app.post('/signup', async (req, res) => {
    console.log('Received signup form submission:', req.body);

    try {
        const { username, email, password, confirmPassword } = req.body;

       
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });
        
        if (existingUser) {
            console.log('Username already exists:', username);
            return res.status(400).send("Username already exists. Please choose a different username.");
        }

        if (existingEmail) {
            console.log('Email already exists:', email);
            return res.status(400).send("Email address already exists. Please choose a different email.");
        }

        if (password !== confirmPassword) {
            console.log('Passwords do not match');
            return res.status(400).send("Passwords do not match.");
        }

       
        const newUser = new User({
            username,
            email,
            password, 
        });

        await newUser.save();
        console.log("User saved:", newUser);
        return res.status(200).send("User registered successfully.");
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).send("Internal server error during signup.");
    }
});


app.post('/login', async (req, res) => {
    console.log('Received login form submission:', req.body);

    try {
        const { username, password } = req.body;

        
        const user = await User.findOne({ 
            $or: [{ username }, { email: username }]
        });

        if (!user) {
            console.log('User not found:', username);
            return res.status(400).json({ success: false, message: "Invalid username or email." });
        }

        if (password === user.password) {
            console.log('Password matches, login successful');
            return res.status(200).json({ success: true, message: "Login successful." });
        } else {
            console.log('Invalid password');
            return res.status(400).json({ success: false, message: "Invalid password." });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Internal server error during login.");
    }
});

app.post('/check-username', async (req, res) => {
    try {
        const { username } = req.body;
        console.log('Checking if username exists:', username);

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            console.log('Username exists:', username);
            return res.json({ exists: true });
        } else {
            console.log('Username does not exist:', username);
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error during username check:", error);
        return res.status(500).send("Internal server error during username check.");
    }
});

app.post('/check-email', async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Checking if email exists:', email);

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            console.log('Email exists:', email);
            return res.json({ exists: true });
        } else {
            console.log('Email does not exist:', email);
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error during email check:", error);
        return res.status(500).send("Internal server error during email check.");
    }
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});
