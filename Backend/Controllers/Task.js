const userModel = require("../Model/User.js");

const user = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.log("Error in creating user");
    return res.status(500).json({"Error in creating user": error.message});
  }
};

module.exports = { user };
