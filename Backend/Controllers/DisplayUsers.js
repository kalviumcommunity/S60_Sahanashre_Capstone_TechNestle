const userModel = require("../Model/User");
// const mail = require("../Utils/Mail")

const displayUser = async (req, res) => {
    try {
        const users = await userModel.find({}); 
        res.status(200).json(users); 
        // mail(
        //     'sahusasdi@gmail.com', 
        //     'sahanashre.v@kalvium.community',
        //     'Welcome!',
        //     'Thank you for registering!'
        //   );
    } 
    catch(error) {
        res.status(500).json({ error: "Error in displaying user" });
    }
};

module.exports = displayUser;
