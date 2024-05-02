const registerModel = require("../Model/Register");

const register = async (req, res) => {
  try {
    const email = await registerModel.findOne({ email: req.body.email });
    const username = await registerModel.findOne({ username: req.body.username})
    console.log(req.body)
    if(email){
      return res.json({ message: "User with this email already exist" });
    } 
    else if(username){
      return res.json({ message: "Username already exists. Give some other name.." })
    }
    else {
      const newRegister = new registerModel(req.body);
      const savedRegister = await newRegister.save();
      return res.status(201).json(savedRegister);
    }
  } 
  catch (error) {
    console.log("Error in registering your account:", error.message);
    return res.status(500).json({ error: "Error in registering your account" });
  }
};

module.exports = register;