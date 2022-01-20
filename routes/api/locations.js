import { Router } from "express";
const router = Router();

//Load Location model
import Location from "../../models/Location.js";

//@route POST locations/create
//@desc Create a location
//@access Public
router.post("/create", async (req, res) => {
    const newLocation = new Location({
        name: req.body.name,
        manager: req.body.manager,
        phone: req.body.phone,
        type: req.body.type,
        coordinates: req.body.coordinates
    });

    try {
        let response = await newLocation.save();

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route GET locations/
//@desc Get location by ID
//@access Public
router.get("/", async (req, res) => {
    const locationID = req.query.locationID;

    try {
        let response = await Location.findById(locationID);

        if (!response) {
            return res.sendStatus(404);
        }

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route GET locations/get-all
//@desc Get all locations
//@access Public
router.get("/get-all", async (req, res) => {
    try {
        let response = await Location.find()
            .populate({
                path: "manager", select: "name phone"
            });

        if (!response) {
            return res.sendStatus(404);
        }

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route PUT locations/update
//@desc Update location by ID with values provided in the req.body
//@access Public
router.put("/update", async (req, res) => {
    const locationID = req.query.locationID;

    try {
        let response = await Location.findByIdAndUpdate(locationID, { $set: req.body }, { new: true })

        if (!response) {
            return res.sendStatus(404);
        }

        res.send(response);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

//@route DELETE locations/delete
//@desc Deletes location by ID
//@access Public
router.delete("/delete", async (req, res) => {
    const locationID = req.query.locationID;

    try {
        let response = await Location.findByIdAndDelete(locationID)

        if (!response) {
            return res.sendStatus(404);
        }

        res.statusMessage = "Location with id \"" + locationID + "\" successfully deleted!";
        res.sendStatus(200);
    } catch (error) {
        res.statusMessage = error;
        res.sendStatus(400);
    }
});

export default router;