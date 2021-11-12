const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
        //TODO: Add functionality for type of sports event in order to display proper icon 
    },
    date: {
        type: Date,
        default: Date.now
    },
    participants: {
        // TODO: Add functinality to store users, registered for this event in an array,
        // then show participants out of max allowed (example: 10/12) change color when 12/12
    },
    quota: {
        //TODO: total number of participants needed for the event
    }
});

module.exports = Event = mongoose.model("events", EventSchema);