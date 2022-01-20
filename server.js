import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";
// const { Server } = require("socket.io");

import users from "./routes/api/users.js";
import events from "./routes/api/events.js";
import locations from "./routes/api/locations.js";

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
import { mongoSettings } from "./config/keys.js"

// Connect to MongoDB
mongoose
  .connect(
    mongoSettings.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log("Server error: " + err));

// Passport middleware
app.use(passport.initialize());

// Apply passport config
import applyPassportConfig from "./config/passport.js";
applyPassportConfig(passport);

// Routes
app.use("/api/users", users);
app.use("/api/events", events);
app.use("/api/locations", locations);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if I choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// Socket.io server
// const io = new Server({
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("someone has connected!")

//   socket.on("disconnect", () => {
//     console.log("someone has left")
//   })
// });

// io.listen(4000);

export default app;