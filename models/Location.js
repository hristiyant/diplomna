import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "./User.js"

// Model for locations
const LocationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        required: true
    }
});

const Location = mongoose.model("locations", LocationSchema);

export default Location;