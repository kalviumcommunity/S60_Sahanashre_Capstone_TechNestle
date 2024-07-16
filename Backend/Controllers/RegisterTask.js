const admin = require('firebase-admin');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const registerModel = require('../Model/Register');
const joiSchema = require('../JoiSchema');

const serviceAccountKeyBase64 = process.env.SERVICE_ACCOUNT_KEY;
const serviceAccountKey = Buffer.from(serviceAccountKeyBase64, 'base64').toString('utf8');
const serviceAccount = JSON.parse(serviceAccountKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const register = async (req, res) => {
  const { username, email, password, googleIdToken } = req.body;

  const { error, value } = joiSchema.validate({ username, email, password });
  if (error) {
    return res.status(400).json({ message: "Invalid inputs entered", error: error.message });
  }

  try {
    const emailExists = await registerModel.exists({ email });
    const usernameExists = await registerModel.exists({ username });

    if (emailExists) {
      return res.status(400).json({ message: "User with this email already exists" });
    } else if (usernameExists) {
      return res.status(400).json({ message: "Username already exists. Please choose another." });
    }

    let newRegister;
    if (googleIdToken) {
      let decodedToken;
      try {
        decodedToken = await admin.auth().verifyIdToken(googleIdToken);
      } catch (error) {
        return res.status(400).json({ message: "Invalid Google ID token", error: error.message });
      }

      const googleEmail = decodedToken.email;
      const googleUsername = decodedToken.name;

      const googleEmailExists = await registerModel.exists({ email: googleEmail });
      const googleUsernameExists = await registerModel.exists({ username: googleUsername });

      if (googleEmailExists) {
        return res.status(400).json({ message: "User with this email already exists" });
      } else if (googleUsernameExists) {
        return res.status(400).json({ message: "Username already exists. Please choose another." });
      }

      newRegister = new registerModel({
        username: googleUsername,
        email: googleEmail,
      });
    } else {
      newRegister = new registerModel({ username, email, password });
    }

    const savedRegister = await newRegister.save();
    const accessToken = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '1h' });

    return res.status(201).json({accessToken:accessToken, username:username});
  } catch (error) {
    return res.status(500).json({ error: "Error in registering account" });
  }
};

module.exports = register;
