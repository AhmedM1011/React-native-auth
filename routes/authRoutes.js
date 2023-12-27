const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")

require('dotenv').config();


router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send("This is signup page")
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(422).send({ error: "Please fill all the fields" })
    }

    User.findOne({ email: email }).then(
        async (savedUser) => {
            if (savedUser) {
                return res.status(422).send({ error: "Invalid Credintials" })
            }

            const user = new user({
                name,
                email,
                password
            })

            try {
                await user.save();
                res.send({ message: "User saved succesfully" });
            }
            catch (err) {
                console.log("db err" + err);
                return res.status(422).send({ error: err.message })
            }
        }
    )
})

module.exports = router