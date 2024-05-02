const express = require("express")
const Router = express.Router()
const register = require("../Controllers/RegisterTask.js")
const user = require("../Controllers/UserTask.js")
const login = require("../Controllers/LoginTask.js")

Router.post("/register",register)
Router.post("/user",user)
Router.post("/login",login)

module.exports = Router