const userModel = require('../Model/User'); 

const getUser = async (req, res) => {
  const { profilename } = req.params;

  try {
    const user = await userModel.findOne({ username: profilename });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } 
  catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user data");
  }
};

module.exports = getUser