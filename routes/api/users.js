const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User model
const User = require("../../models/User");

//@route GET users/get-user-by-id
//@desc Get user by id
//@access Public
router.get("/", (req, res) => {
    const userID = req.query.id;
    // console.log("ID FROM PARAMS: " + JSON.stringify(req.params.id));
    User.findById(userID, function (err, user) { console.log(user) })
        .then(user => res.json(user));
});

//@route GET users/get-all-users
//@desc Get all users
//@access Public
router.get("/get-all-users", (req, res) => {
    User.find()
        .then(users => res.json(users));
});

//@route POST users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
    //Form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            //Hash password before saving it to the database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

//@route POST users/login
//@desc Login user and return JWT token
//@access Public
router.post("/login", (req, res) => {
    //Form validation

    const { errors, isValid } = validateLoginInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email }).then(user => {
        //Check if user exists
        if (!user) {
            return res.status(400).json({ emailnotfound: "Email not found" });
        }

        //Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //User matched
                //Create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                //Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 //1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearrer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

//@route POST users/create-friend-request
//@desc Create a friend request
//@access Public
router.post("/create-friend-request", (req, res) => {
    var fromUserID = req.body.params.fromUserID;
    var fromUserName = req.body.params.fromUserName;
    var _id = req.body.params.toUser;

    var newFriendRequest = {
        fromUserID: fromUserID,
        fromUserName: fromUserName
    }

    User.findOne({ _id })
        .then(user => {
            //Check if friend request exists
            if (user.friendRequests.some(e => e.fromUser === fromUserID)) {
                return res.status(400).json({ alreadyexists: "Friend request already exists" });
            }

            User.findOneAndUpdate(
                { _id: _id },
                { $push: { friendRequests: newFriendRequest } },
                { new: true },
                function (error, result) {
                    if (error) {
                        // console.log(error);
                        res.send(error);
                    } else {
                        // console.log(success);
                        res.send(result);
                    }
                }
            );
        });
});

//@route POST users/delete-friend-request
//@desc Delete a friend request
//@access Public
router.post("/delete-friend-request", async (req, res) => {
    const user = req.body.params.userID;
    const request = req.body.params.friendRequestID;

    let response = await User.findOneAndUpdate(
        { _id: user },
        { $pull: { friendRequests: { _id: request } } },
        { new: true }
    );

    res.send(response.friendRequests);
});

//@route GET users/get-friend-requests
//@desc Get all friend requests for user
//@access Public
router.get("/get-friend-requests", async (req, res) => {
    let response = await User.findById(req.query.id);
    res.send(response.friendRequests);
});

//@route POST users/add-friend
//@desc Add one user to another one's friends list
//@access Public
router.post("/add-friend", async (req, res) => {
    const sender = req.body.params.requestSenderID;
    const receiver = req.body.params.requestReceiverID;
    const request = req.body.params.friendRequestID;

    await User.findOneAndUpdate(
        { _id: sender },
        { $push: { friends: receiver } },
        { new: true }
    );

    let response = await User.findOneAndUpdate(
        { _id: receiver },
        { $push: { friends: sender }, $pull: { friendRequests: { _id: request } } },
        { new: true }
    );

    res.send(response.friendRequests);
});

module.exports = router;