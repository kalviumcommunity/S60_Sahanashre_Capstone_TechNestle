const sendMail = require("../Utils/Mail")

const Mail = (req, res) => {
    const { from, to, subject, text } = req.body;

    sendMail(from, to, subject, text, (err, info) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Email sent successfully', info });
    });
};

module.exports = Mail;