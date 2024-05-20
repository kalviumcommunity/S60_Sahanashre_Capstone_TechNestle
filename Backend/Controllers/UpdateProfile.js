const userModel = require("../Model/User");

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const update = await userModel.findByIdAndUpdate(id, req.body);
        if (!update) {
            return res.status(404).send("User not found");
        }
        res.status(200).send(update);
    }
     catch (err) {
        res.status(500).send("Error in updating user");
    }
};

module.exports = updateUser;
