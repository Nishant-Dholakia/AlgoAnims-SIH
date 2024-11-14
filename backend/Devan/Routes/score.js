const User = require('../Models/User')
const UserDetails = require('../Models/UserDetails')
const UserScore = require('../Models/UserScore')
const router = require('express').Router()

router.post('/update', async (req, res, next) => {
    try {
        let { id, topic, qname, checked } = req.body
        console.log(id, topic, qname, checked)

        let temp = checked ? 1 : -1;

        const Userscore = await UserScore.findOne({ user: id });

        if (!Userscore) {
            Userscore = await UserScore.create({ user: id });
        }

        if (!Userscore[topic]) {
            Userscore[topic] = [];
        }
        console.log("here");
        console.log(Userscore[topic]);

        if (!Userscore[topic].find((item) => item.qname === qname)) {
            Userscore[topic].push({ qname: qname, score: temp });
        } else {
            Userscore[topic].find((item) => item.qname === qname).score += temp;
        }

        if (!Userscore.totalscore) {
            Userscore.totalscore = [];
        }

        if (!Userscore.totalscore.find((item) => item.topic === topic)) {
            Userscore.totalscore.push({ topic: topic, score: temp });
        } else {
            Userscore.totalscore.find((item) => item.topic === topic).score += temp;
        }

        let finalScore = 0;
        Userscore.totalscore.forEach(element => {
            finalScore += element.score;
        });
        Userscore.finalScore = finalScore;
        await Userscore.save();
        res.json({ status: "success" });
    } catch (error) {
        next(error);
    }
})

router.post('/getscore', async (req, res, next) => {
    try {
        let { id, topic } = req.body;
        const Userscore = await UserScore.findOne({ user: id });
        res.json({ score: Userscore[topic] });
    } catch (error) {
        next(error);
    }
})

module.exports = router;

