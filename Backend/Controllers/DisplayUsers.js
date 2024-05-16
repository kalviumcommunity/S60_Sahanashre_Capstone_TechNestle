const userModel = require("../Model/User");

const displayUser = async (req, res) => {
    try {
        const users = await userModel.find({}); 
        res.status(200).json(users); 
    } 
    catch(error) {
        res.status(500).json({ error: "Error in displaying user" });
    }
};

module.exports = displayUser;
