const bcrypt = require('bcrypt');
const registerModel = require("../Model/Register");
const userModel=require("../Model/User")
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await registerModel.findOne({ email });
        const photo = await userModel.findOne({username:user.username})
        console.log(photo)
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist. Kindly register" });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.status(201).json({ ...user,photo:photo.profilePhoto,message: "Login successful" });
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