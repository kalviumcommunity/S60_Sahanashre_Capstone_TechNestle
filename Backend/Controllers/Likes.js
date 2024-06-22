const LikeModel = require("../Model/Likes");
const UserModel = require("../Model/User");

const ToogleLikeStatus = async (req, res) => {
    const { from, to } = req.body;

    try {
        const existingLike = await LikeModel.findOne({ from, to });
        
        const user = await UserModel.findOne({ username: to });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        let likeCount = user.likes;

        if (existingLike) {
            await LikeModel.deleteOne({ from, to });
            if(likeCount > 0){
                likeCount -= 1;
            }
            await UserModel.findOneAndUpdate({ username: to }, { likes: likeCount });
            res.status(200).send({ message: "Like removed", likeCount: likeCount });
        }
        else {
            const data = new LikeModel({ from, to });
            await data.save();
            likeCount += 1;
            await UserModel.findOneAndUpdate({ username: to }, { likes: likeCount });
            res.status(200).send({ message: "Like added", likeCount: likeCount });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Cannot update like status for the developer", error: err.message });
    }
};

module.exports = ToogleLikeStatus;
