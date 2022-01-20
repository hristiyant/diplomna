import { Router } from "express";
const router = Router();

//Load Event model
import Event from "../../models/Event.js";

//@route POST events/create
//@desc Create an event
//@access Public
router.post("/create", async (req, res) => {
    const newDate = new Date(req.body.date);
    const now = new Date();

    // Event date validation
    if (newDate < now) {
        res.sendStatus(400).json({ datenotallowed: "Date cannot be in the past" });
    } else {
        const newEvent = new Event({
            name: req.body.name,
            createdBy: req.body.createdBy,
            type: req.body.type,
            date: req.body.date,
            location: req.body.location,
            participants: [req.body.createdBy],
            quota: req.body.quota
        });

        try {
            let response = await newEvent.save();

            res.send(response);
        } catch (error) {
            res.statusMessage = error;
            res.sendStatus(400);
        }
    }
});

//@route GET events/get-all
//@desc Get all events
//@access Public
router.get("/get-all", async (req, res) => {
    try {
        let response = await Event.find()
            .populate([
                { path: "createdBy", select: "name imageUrl phone" },
                { path: "participants", select: "name imageUrl phone" },
                { path: "location", select: "name phone coordinates" }

            ]);

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route GET events/upcoming-for
//@desc Get the first 5 events, that user is attending, starting from the nearest one in time
//@access Public
router.get("/upcoming-for", async (req, res) => {
    const userID = req.query.userID;
    console.log(userID)

    try {
        let response = await Event.find({ participants: { _id: userID } })
            .sort({ date: "ascending" })
            .limit(5)
            .populate([
                { path: "createdBy", select: "name imageUrl phone" },
                { path: "participants", select: "name imageUrl phone" },
                { path: "location", select: "name phone coordinates" }
            ]);

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});


//@route PUT events/subscribe
//@desc Subscribe to an event
//@access Public
router.put("/subscribe", async (req, res) => {
    const eventID = req.query.eventID;
    const userID = req.query.userID;

    try {
        // First, subscribing to the event
        await Event.findOneAndUpdate(
            { _id: eventID },
            { $push: { participants: userID } },
            { new: true }
        );

        // Then fetching the updated list of events
        let response = await Event.find()
            .populate([
                { path: "createdBy", select: "name imageUrl phone" },
                { path: "participants", select: "name imageUrl phone" },
                { path: "location", select: "name phone coordinates" }
            ])

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route PUT events/unsubscribe
//@desc Unsubscribe to an event
//@access Public
router.put("/unsubscribe", async (req, res) => {
    const eventID = req.query.eventID;
    const userID = req.query.userID;

    try {
        // First, unsubscribing to the event
        await Event.findOneAndUpdate(
            { _id: eventID },
            { $pull: { participants: userID } },
            { new: true }
        );

        // Then fetching the updated list of events
        let response = await Event.find()
            .populate([
                { path: "createdBy", select: "name imageUrl phone" },
                { path: "participants", select: "name imageUrl phone" },
                { path: "location", select: "name phone coordinates" }
            ]);

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route DELETE events/delete
//@desc Delete an event
//@access Public
router.delete("/delete", async (req, res) => {
    const eventID = req.query.eventID;

    try {
        // Frist, deleting the event
        await Event.findOneAndDelete({ _id: eventID });

        // Then fetching the updated list of events
        let response = await Event.find()
            .populate([
                { path: "createdBy", select: "name imageUrl phone" },
                { path: "participants", select: "name imageUrl phone" },
                { path: "location", select: "name phone coordinates" }
            ]);

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

export default router;