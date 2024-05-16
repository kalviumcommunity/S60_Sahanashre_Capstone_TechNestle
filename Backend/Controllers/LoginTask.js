const bcrypt = require('bcrypt');
const registerModel = require("../Model/Register");

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist. Kindly register" });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.status(201).json({ message: "Login successful" });
        } else {
            res.status(400).json({ message: "Details given by the user did not match" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = login;
