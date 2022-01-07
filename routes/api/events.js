const express = require("express");
const router = express.Router();

//Load Event model
const Event = require("../../models/Event");

//@route POST events/create
//@desc Create an event
//@access Public
router.post("/create", (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        createdBy: req.body.createdBy,
        type: req.body.type,
        quota: req.body.quota,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        participants: [req.body.createdBy]
    });

    newEvent.save()
        .then(response => res.send(response))
        .catch(error => {
            res.statusMessage = error;
            res.sendStatus(400);
        });
});

//@route GET events/get-all
//@desc Get all events
//@access Public
router.get("/get-all", (req, res) => {
    Event.find()
        .populate([
            { path: "createdBy", select: "name imageUrl" },
            { path: "participants", select: "name imageUrl" }
        ])
        .exec()
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.statusMessage = error;
            res.sendStatus(400);
        });
});


//@route POST events/subscribe
//@desc Subscribe to an event
//@access Public
router.post("/subscribe", async (req, res) => {
    const eventID = req.body.params.eventID;
    const subscriberID = req.body.params.userID;

    try {
        // First, subscribing to the event
        await Event.findOneAndUpdate(
            { _id: eventID },
            { $push: { participants: subscriberID } },
            { new: true }
        );

        // Then fetching the updated list of events
        let response = await Event.find()
            .populate([
                { path: "createdBy", select: "name imageUrl" },
                { path: "participants", select: "name imageUrl" }
            ])
            .exec();

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route POST events/unsubscribe
//@desc Subscribe to an event
//@access Public
router.post("/unsubscribe", async (req, res) => {
    const eventID = req.body.params.eventID;
    const subscriberID = req.body.params.userID;

    try {
        // First, unsubscribing to the event
        await Event.findOneAndUpdate(
            { _id: eventID },
            { $pull: { participants: subscriberID } },
            { new: true }
        );

        // Then fetching the updated list of events
        let response = await Event.find()
            .populate([
                { path: "createdBy", select: "name imageUrl" },
                { path: "participants", select: "name imageUrl" }
            ])
            .exec();

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route POST events/delete-event
//@desc Delete an event
//@access Public
router.post("/delete-event", async (req, res) => {
    const eventID = req.body.params.eventID;

    try {
        // Frist, deleting the event
        await Event.findOneAndDelete({ _id: eventID });

        // Then fetching the updated list of events
        let response = await Event.find()
            .populate({
                path: "createdBy"
            });

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

module.exports = router;