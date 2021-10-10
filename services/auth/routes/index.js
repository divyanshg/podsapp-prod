    require('dotenv').config()
const _auth = require("express").Router()
const User = require("../models/User")
const {
    v4: uuid
} = require("uuid")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwt_Decode = require("jwt-decode")

_auth.post('/authorize', async (req, res) => {
    try {
        // Get user input
        const {
            email,
            password
        } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({
            $or: [{
                    email
                },
                {
                    phoneNumber: req.body.email
                }
            ]
        });

        console.log(user.password)

        if (user && (await bcrypt.compare(password, user.password))) {
            //Check if a valid token already exists for the user
            try {
                const decoded = jwt.verify(user.token, process.env.TOKEN_KEY)
                const token = user.token

                user.password = undefined;

                return res.status(200).json({
                    user,
                    token
                });
            } catch (err) {
                // Create token
                const token = jwt.sign({
                        uid: user.uid,
                        email
                    },
                    process.env.TOKEN_KEY, {
                        expiresIn: "2h",
                    }
                );

                user.token = token
                await user.save()
                user.password = undefined

                req.user = user

                return res.status(200).json({
                    user,
                    token
                });
            }
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }

})

_auth.post("/logout", async(req, res) => {
    try{
        const {token} = req.body,
              user = jwt_Decode(token)   
        const dbUser = await User.findOne({uid: user.uid}).select({token: 1})
        dbUser.token = null
        await dbUser.save()
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

_auth.post("/register", async (req, res) => {
    try {
        // Get user input
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        } = req.body;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("You are missing some details!");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({
            $or: [{
                    email: email
                },
                {
                    phoneNumber: phoneNumber
                }
            ]
        });

        if (oldUser) {
            return res.status(409).send("An User with this E-Mail Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        const uid = uuid()

        // Create token
        const token = jwt.sign({
                uid,
                email
            },
            process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );

        // Create user in our database
        const user = await User.create({
            uid,
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            phoneNumber,
            token
        });

        req.user = user;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
})

_auth.post('/user', async (req, res) => {
    const {
        uid
    } = req.body

    const user = await User.findOne({
        uid
    }).select({
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        uid: 1,
        isPremium: 1
    })

    if (!user) return res.status(404).json({
        err: "user not found"
    })

    res.json(user)

})

module.exports = _auth