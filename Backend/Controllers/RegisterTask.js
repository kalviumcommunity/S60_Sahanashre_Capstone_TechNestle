const registerModel = require("../Model/Register");
const joiSchema = require("../JoiSchema"); 

const register = async (req, res) => {
  // Joi validation
  const { error, value } = joiSchema.validate(req.body);
  if(error){
    return res.status(400).json({ message: "Invalid inputs entered", error: error.message });
  }

  try{
    const emailExists = await registerModel.exists({ email: req.body.email });
    const usernameExists = await registerModel.exists({ username: req.body.username });
    
    if(emailExists){
      return res.status(400).json({ message: "User with this email already exists" });
    } 
    else if(usernameExists){
      return res.status(400).json({ message: "Username already exists. Please choose another." });
    } 
    else{
      const newRegister = new registerModel(req.body);
      const savedRegister = await newRegister.save();
      return res.status(201).json(savedRegister);
    }
  } 
  catch(error){
    console.error("Error in registering account:", error.message);
    return res.status(500).json({ error: "Error in registering account" });
  }
};

module.exports = register;