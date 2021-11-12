const express = require("express");
const router = express.Router();

//Load Event model
const Event = require("../../models/Event");

//@route GET events/get
//@desc Get all events
//@access Public
router.get("/get", (req, res) => {
    Event.find()
        .then(events => res.json(events));
});

//@route POST events/create
//@desc Create an event
//@access Public
router.post("/create", (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        eventType: req.body.eventType
    });

    newEvent.save()
        .then(event => res.json(event));
});

module.exports = router;