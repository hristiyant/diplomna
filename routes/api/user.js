const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("config\keys.js");

//Load input validation
const validateRegisterInput = require("validation\register.js");
const ValidateLoginInput = require("validation\login.js");

//Load User model
const User = require("models\User.js")