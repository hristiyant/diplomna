const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    participants: {
        type: [Schema.Types.ObjectId],
        ref: "users"
    },
    quota: {
        type: Number,
        required: true
    }
});

module.exports = Event = mongoose.model("events", EventSchema);