const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
    commenter: {
        type: String,
        required: true
    },
    commentedTo: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const feedback = mongoose.model("comment",feedbackSchema)
module.exports = feedback