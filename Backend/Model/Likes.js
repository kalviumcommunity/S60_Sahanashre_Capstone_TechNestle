const mongoose = require("mongoose");

const likedDevSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
});

const TopLikedDev = mongoose.model("TopLikedDev", likedDevSchema);

module.exports = TopLikedDev;
