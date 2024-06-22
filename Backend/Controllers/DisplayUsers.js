const userModel = require("../Model/User");
const likeModel = require("../Model/Likes");

const displayUser = async (req, res) => {
    try {
        const users = await userModel.find({});
        const likes = await likeModel.find({ from: req.user });
        const likedUsers = likes.map(like => like.to);
        res.status(200).json({
            users: users,
            likedUsers: likedUsers
        });
    } 
    catch(error) {
        res.status(500).json({ error: "Error in displaying user" });
    }
};

module.exports = displayUser;
