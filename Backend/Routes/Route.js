const express = require("express")
const Router = express.Router()
const register = require("../Controllers/RegisterTask.js")
const createUser = require("../Controllers/Profile.js")
const login = require("../Controllers/LoginTask.js")
const displayUser = require("../Controllers/DisplayUsers.js")
const updateUser = require("../Controllers/UpdateProfile.js")
const deleteUser = require("../Controllers/DeleteProfile.js")

Router.post("/register",register)
Router.post("/createuser",createUser)
Router.post("/login",login)
Router.get("/user",displayUser)
Router.put("/updateuser/:id",updateUser)
Router.delete("/deleteuser/:id",deleteUser)

module.exports = Router