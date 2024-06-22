const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = require("../Controllers/RegisterTask.js");
const createUser = require("../Controllers/Profile.js");
const login = require("../Controllers/LoginTask.js");
const displayUsers = require("../Controllers/DisplayUsers.js");  // Ensure this matches your displayUser controller
const updateUser = require("../Controllers/UpdateProfile.js");
const deleteUser = require("../Controllers/DeleteProfile.js");
const createRequest = require("../Controllers/Request.js");
const displayUser = require("../Controllers/DisplayUser.js");
const IncomingRequest = require("../Controllers/IncomingRequest.js");
const OutgoingRequest = require("../Controllers/OutgoingRequest.js");
const UpdateRequestStatus = require("../Controllers/UpdateRequestStatus.js");
const ToogleLikeStatus = require("../Controllers/Likes.js");

const AuthenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized (When no token is provided by the client.)
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden (When the provided token is invalid or expired.)
        }
        console.log(user)
        req.user = user;
        req.id = user.id;
        next();
    });
};

Router.post("/register", register);
Router.post("/login", login);
Router.post("/users", AuthenticateToken, createUser);
Router.get("/users", AuthenticateToken, displayUsers); 
Router.get("/users/:profilename", AuthenticateToken, displayUser);
Router.get("/users/:profilename/incoming-requests", AuthenticateToken, IncomingRequest);
Router.get("/users/:profilename/outgoing-requests", AuthenticateToken, OutgoingRequest);
Router.put("/users/:profilename", AuthenticateToken, updateUser);
Router.post("/users/:profilename/toggle-like", ToogleLikeStatus);
Router.delete("/users/:id", deleteUser);
Router.post("/requests", createRequest);
Router.put("/requests/:id", AuthenticateToken, UpdateRequestStatus);

module.exports = Router;
