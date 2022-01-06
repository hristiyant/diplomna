const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const { Server } = require("socket.io");

const users = require("./routes/api/users");
const events = require("./routes/api/events");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log("Server error: " + err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/events", events);

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