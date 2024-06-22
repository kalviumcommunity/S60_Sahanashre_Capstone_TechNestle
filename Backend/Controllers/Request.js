const sendMail = require("../Utils/Mail");
const RequestDetail = require("../Model/RequestDetails");
const Register = require("../Model/Register");

const CreateRequest = async (req, res) => {
    const { from, to, subject, text } = req.body;

    try {
        const user = await Register.findOne({ username: to });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const toEmail = user.email;

        const requestDetail = new RequestDetail({
            from: from,
            to: to, 
            subject,
            mailBody: text,
            skills: []
        });

        await requestDetail.save();

        await sendMail({from:"sahusasdi@gmail.com", to:toEmail, subject, text});
        
        return res.status(200).json({ message: 'Request sent successfully' });

    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = CreateRequest;