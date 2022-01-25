import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mongoSettings } from "../../config/keys.js";

//Load input validation
import validateRegisterInput from "../../validation/register.js";
import validateLoginInput from "../../validation/login.js";

//Load User model
import User from "../../models/User.js";
import Event from "../../models/Event.js";

//@route GET users/
//@desc Get user by id
//@access Public
router.get("/", async (req, res) => {
    const userID = req.query.userID;

    try {
        let response = await User.findById(userID)
            .populate([
                { path: "friends", select: "name imageUrl phone" },
                { path: "invitations", select: "date type fromUser" }
            ]);

        if (!response) {
            return res.sendStatus(404);
        }

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }

});

//@route GET users/get-all
//@desc Get all users
//@access Public
router.get("/get-all", async (req, res) => {
    try {
        let response = await User.find()
            .populate([
                { path: "friends", select: "name imageUrl phone email" },
                { path: "invitations", select: "date type fromUser" }
            ]);

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route POST users/register
//@desc Register user
//@access Public
router.post("/register", async (req, res) => {
    //Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    await User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            });

            //Hash password before saving it to the database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    try {
                        let response = await newUser.save();

                        res.send(response);
                    } catch (error) {
                        res.statusMessage = error;
                        res.sendStatus(400);
                    }
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
    User.findOne({ email })
        .populate([
            { path: "friends", select: "name imageUrl phone email" },
            {
                path: "invitations", select: "date type fromUser ",
                populate: [
                    { path: "fromUser", select: "name" },
                    { path: "event", select: "name date location" }
                ]
            }

        ])
        .then(user => {
            //Check if user exists
            if (!user) {
                return res.status(400).json({ emailnotfound: "Email not found" });
            }

            //Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //User matched
                    //Create JWT payload
                    console.log("User data: " + JSON.stringify(user));
                    const payload = {
                        id: user.id,
                        name: user.name,
                        imageUrl: user.imageUrl,
                        friends: user.friends,
                        invitations: user.invitations
                    };

                    //Sign token
                    jwt.sign(
                        payload,
                        mongoSettings.secretOrKey,
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

//@route PUT users/set-profile-pic
//@desc Set user's imageURL in db
//@access Public
router.put("/set-profile-pic", async (req, res) => {
    var userID = req.query.userID;
    var imageUrl = req.query.imageUrl;
    console.log(req.query)
    try {
        let response = await User.findOneAndUpdate(
            { _id: userID },
            { $set: { imageUrl: imageUrl } },
            { new: true });

        // res.send(response.imageUrl);
        res.send(response)
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route PUT users/send-invitation-to
//@desc Send invitation to user
//@access Public
router.put("/send-invitation", async (req, res) => {
    const toUser = req.query.toUser;
    const fromUser = req.query.fromUser;
    const type = req.query.type;
    const event = !req.query.event ? "" : req.query.event;

    console.log(req.query);
    // return
    var newInvitation = {
        fromUser: fromUser,
        type: type
    }

    try {
        let user = await User.findById(toUser);

        //Check if friend request exists
        switch (type) {
            case "EVENT":
                if (user.invitations.some(e => e.event == event)) {
                    return res.status(400).json({ alreadyexistss: "error" });
                }
                newInvitation.event = event;
                break;
            case "FRIEND_REQUEST":
                if (user.invitations.some(e => e.type === "FRIEND_REQUEST" && e.fromUser == fromUser)) {
                    return res.status(400).json({ alreadyexists: "Invitation already exists" });
                }
                break;
        }

        try {
            let response = await User.findOneAndUpdate(
                { _id: toUser },
                { $push: { invitations: newInvitation } },
                { new: true });

            res.send(response);
        } catch (error) {
            res.statusMessage = error;
            res.sendStatus(400);
        }
    } catch (error) {
        console.log("StatusMessage: " + res.statusMessage);
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route DELETE users/delete-invitation
//@desc Delete an invitation
//@access Public
router.delete("/delete-friend-request", async (req, res) => {
    const fromUser = req.query.fromUser;
    const toUser = req.query.toUser;
    const requestID = req.query.requestID

    // console.log(req.query);
    // return
    try {
        let response = await User.findOneAndUpdate(
            { _id: toUser },
            { $pull: { invitations: { fromUser: fromUser, _id: requestID } } },
            { new: true }
        ).populate([
            { path: "invitations.fromUser", select: "name imageUrl phone" },
            {
                path: "invitations.event", select: "name date location",
                populate: { path: "location", select: "name manager phone coordinates" }
            }
        ]);

        res.send(response.invitations);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route GET users/get-invitations-for
//@desc Get all invitations for user
//@access Public
router.get("/get-invitations-for", async (req, res) => {
    const userID = req.query.userID;

    try {
        let response = await User.findById(userID)
            .populate([
                { path: "invitations.fromUser", select: "name imageUrl phone" },
                {
                    path: "invitations.event", select: "name date location",
                    populate: { path: "location", select: "name manager phone coordinates" }
                }
            ]);

        res.send(response.invitations);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route PUT users/accept-friend
//@desc Add one user to another one's friends list
//@access Public
router.put("/accept-friend", async (req, res) => {
    const fromUser = req.query.fromUser;
    const toUser = req.query.toUser;
    const invitationID = req.query.invitationID;

    try {
        await User.findOneAndUpdate(
            { _id: fromUser },
            { $push: { friends: toUser } },
            { new: true }
        );

        let response = await User.findOneAndUpdate(
            { _id: toUser },
            { $push: { friends: fromUser }, $pull: { invitations: { _id: invitationID } } },
            { new: true }
        );

        res.send(response.invitations);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route PUT users/accept-friend
//@desc Add one user to another one's friends list
//@access Public
router.put("/accept-event", async (req, res) => {
    const fromUser = req.query.fromUser;
    const toUser = req.query.toUser;
    const invitationID = req.query.invitationID;
    const event = req.query.event;

    console.log(JSON.stringify(req.query));

    try {
        await Event.findOneAndUpdate(
            { _id: event },
            { $push: { participants: toUser } },
            { new: true }
        );

        let response = await User.findOneAndUpdate(
            { _id: toUser },
            { $pull: { invitations: { _id: invitationID } } },
            { new: true }
        );

        res.send(response.invitations);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route PUT users/remove-friend
//@desc Remove friend relationship between two users
//@access Public
router.put("/remove-friend", async (req, res) => {
    const userID = req.query.userID;
    const friendID = req.query.friendID;

    try {
        let response = await User.findOneAndUpdate(
            { _id: userID },
            { $pull: { friends: friendID } },
            { new: true }
        ).populate([
            { path: "friends", select: "name imageUrl phone email" },
            { path: "invitations", select: "date type fromUser" }
        ]);

        await User.findOneAndUpdate(
            { _id: friendID },
            { $pull: { friends: userID } },
            { new: true }
        );

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

export default router;