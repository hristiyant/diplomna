const express = require("express");
const router = express.Router();

//Load Event model
const Event = require("../../models/Event");

//@route GET events/get
//@desc Get all events
//@access Public
router.get("/get-all", async (req, res) => {
    let response = await Event.find();
    // .then(events => res.json(events));
    res.send(response);
});

//@route POST events/create
//@desc Create an event
//@access Public
router.post("/create", (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        createdBy: req.body.createdBy,
        eventType: req.body.eventType,
        quota: req.body.quota
    });

    newEvent.save()
        .then(event => res.json(event));
});

//@route POST events/subscribe
//@desc Subscribe to an event
//@access Public
router.post("/subscribe", async (req, res) => {
    const eventID = "";
    const subscriberID = "";

    await Event.findOneAndUpdate(
        { _id: eventID },
        { $push: { participants: subscriberID } },
        { new: true }
    );

    let response = await Event.find();

    res.send(response);
});

//@route POST events/delete-event
//@desc Delete an event
//@access Public
router.post("/delete-event", async (req, res) => {
    const eventID = req.body.params.eventID;

    await Event.findOneAndDelete({ _id: eventID });

    let response = await Event.find();

    res.send(response);
});

module.exports = router;