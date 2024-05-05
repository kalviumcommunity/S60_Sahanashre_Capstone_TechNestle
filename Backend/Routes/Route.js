const express = require("express")
const Router = express.Router()
const register = require("../Controllers/RegisterTask.js")
const createUser = require("../Controllers/CreateUser.js")
const login = require("../Controllers/LoginTask.js")
const displayUser = require("../Controllers/DisplayUser.js")

Router.post("/register",register)
Router.post("/createuser",createUser)
Router.post("/login",login)
Router.get("/user",displayUser)

module.exports = Router