const express = require("express")
const Router = express.Router()
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = require("../Controllers/RegisterTask.js")
const createUser = require("../Controllers/Profile.js")
const login = require("../Controllers/LoginTask.js")
const displayUser = require("../Controllers/DisplayUsers.js")
const updateUser = require("../Controllers/UpdateProfile.js")
const deleteUser = require("../Controllers/DeleteProfile.js")


const AuthenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.sendStatus(401);        // Unauthorized(When no token is provided by the client.)
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);     // Forbidden(When the provided token is invalid(i.e token is not correct) or expired.)
      }
      req.user = user;
      req.id = user.id;
      next();
    });
  };

Router.post("/register",register)
Router.post("/createuser",AuthenticateToken,createUser)
Router.post("/login",login)
Router.get("/user",displayUser)
Router.put("/updateuser/:profilename",AuthenticateToken,updateUser)
Router.delete("/deleteuser/:id",deleteUser)

module.exports = Router