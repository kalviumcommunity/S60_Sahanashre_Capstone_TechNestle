const userModel = require("../Model/User");

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
            res.status(200).send("Deleted profile successfully");
    } 
    catch (err) {
        res.status(500).send("Error in deleting profile");
    }
};

module.exports = deleteUser;