const registerModel = require("../Model/Register");
const joiSchema = require("../JoiSchema"); 
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

const register = async (req, res) => {
  // Joi validation
  const { error, value } = joiSchema.validate(req.body);
  if(error){
    return res.status(400).json({ message: "Invalid inputs entered", error: error.message });
  }

  try{
    const emailExists = await registerModel.exists({ email: req.body.email });
    const usernameExists = await registerModel.exists({ username: req.body.username });
    const {username} = req.body
    
    if(emailExists){
      return res.status(400).json({ message: "User with this email already exists" });
    } 
    else if(usernameExists){
      return res.status(400).json({ message: "Username already exists. Please choose another." });
    } 
    else{
      const accessToken = jwt.sign(username,process.env.SECRET_KEY,{ expiresIn: '1h' })
      const newRegister = new registerModel(req.body);
      const savedRegister = await newRegister.save();
      return res.status(201).json(accessToken);
    }
  } 
  catch(error){
    console.error("Error in registering account:", error.message);
    return res.status(500).json({ error: "Error in registering account" });
  }
};

module.exports = register;