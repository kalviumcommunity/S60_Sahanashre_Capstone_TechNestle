const express = require("express")
const Router = express.Router()
const {user} = require("../Controllers/Task.js")

Router.post("/user",user)

module.exports = Router