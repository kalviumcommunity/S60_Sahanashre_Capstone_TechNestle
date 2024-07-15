const bcrypt = require('bcrypt');
const registerModel = require("../Model/Register");
const userModel = require("../Model/User");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const env = require("dotenv").config();

const login = async (req, res) => {
    const { email, password, googleIdToken } = req.body;

    // Initialize Firebase Admin SDK
    const serviceAccountKeyBase64 = process.env.SERVICE_ACCOUNT_KEY;
    const serviceAccountKey = Buffer.from(serviceAccountKeyBase64, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(serviceAccountKey);

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    try {
        const user = await registerModel.findOne({ email });
        const photo = await userModel.findOne({ username: user.username });

        if (!user) {
            return res.status(400).json({ message: "User doesn't exist. Kindly register" });
        }

        const name = user.username;

        if (password) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ username: name }, process.env.SECRET_KEY, { expiresIn: '1h' });
                return res.status(201).json({ token, ...user, photo: photo?.profilePhoto ?? "", message: "Login successful" });
            } else {
                return res.status(400).json({ message: "Details given by the user did not match" });
            }
        }

        if (googleIdToken) {
            try {
                const decodedToken = await admin.auth().verifyIdToken(googleIdToken);
                if (decodedToken.email===email) {
                    const token = jwt.sign({ username: name }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    return res.status(201).json({ token, ...user, photo: photo?.profilePhoto ?? "", message: "Login successful" });
                } else {
                    return res.status(400).json({ message: "Google ID token email does not match the provided email" });
                }
            } catch (error) {
                return res.status(400).json({ message: "Invalid Google ID token", error: error.message });
            }
        }

        return res.status(400).json({ message: "Password or Google ID token must be provided" });

    } catch (error) {
        console.log(error,error.message,"sahana");
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = login;
