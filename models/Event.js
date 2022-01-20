import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "./User.js";
import Location from "./Location.js";

// Model for events
const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: Location,
        required: true
    },
    participants: {
        type: [Schema.Types.ObjectId],
        ref: User
    },
    quota: {
        type: Number,
        required: true
    }
});

const Event = mongoose.model("events", EventSchema);

export default Event;