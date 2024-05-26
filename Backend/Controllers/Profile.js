const userModel = require("../Model/User");

const user = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } 
  catch (error) {
    console.log("Error in creating user details");
    return res.status(500).json({"Error in creating user details": error.message});
  }
};

module.exports = user;
