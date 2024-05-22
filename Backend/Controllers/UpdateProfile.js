const userModel = require("../Model/User");

const updateUser = async (req, res) => {
    const { profilename } = req.params;
    try {
        const update = await userModel.findOneAndUpdate({username:profilename}, req.body);
        if (!update) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(update);
    }
     catch (err) {
        console.log(err)
        res.send("Error in updating user",err);
    }
};
module.exports = updateUser;
