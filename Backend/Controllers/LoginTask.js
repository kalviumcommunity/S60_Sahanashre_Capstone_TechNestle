const bcrypt = require('bcrypt');
const registerModel = require("../Model/Register");
const userModel=require("../Model/User")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await registerModel.findOne({ email });
        const photo = await userModel.findOne({username:user.username})
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist. Kindly register" });
        }
        const name = user.username
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ username: name }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(201).json({ token,...user,photo:photo.profilePhoto,message: "Login successful" });
        } 
        else {
            res.status(400).json({ message: "Details given by the user did not match" });
        }
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error"+error });
    }
};

module.exports = login;