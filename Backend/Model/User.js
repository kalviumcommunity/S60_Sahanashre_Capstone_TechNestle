const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    socialMedia:{
        type: {
            linkedin: {
                type: String,
                default: ""
            },
            github: {
                type: String,
                default: ""
            }
        }
    } ,
    profilePhoto:{
        type: String
    }
})

const user = mongoose.model("user",userSchema)
module.exports = user