const userModel = require("../Model/User");
const likeModel = require("../Model/Likes");

const displayUser = async (req, res) => {
    try {
        const loggedInUser = req.user;

        let users = await userModel.find({});
        users = users.filter(user => user.username !== loggedInUser.username && user.skills && user.skills.length > 0);
        
        const likes = await likeModel.find({ from: req.user.username });
        const likedUsers = likes.map(like => like.to);

        const getTopDevelopers = async () => {
            try {
                const topDevelopers = await userModel.find({})
                    .sort({ likes: -1 })
                    .limit(3);
                return topDevelopers.filter(dev => dev.username !== loggedInUser.username);
            } catch (error) {
                console.error(error);
                throw error;
            }
        };

        const topDevelopers = await getTopDevelopers();

        res.status(200).json({
            users: users,
            likedUsers: likedUsers,
            topDevelopers: topDevelopers
        });
    } catch (error) {
        res.status(500).json({ error: "Error in displaying user" });
    }
};

module.exports = displayUser;
