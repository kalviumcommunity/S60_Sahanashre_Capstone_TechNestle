const nodemailer = require("nodemailer");
require("dotenv").config();

const port = process.env.MAIL_PORT;
const user = process.env.USER_MAIL;
const pass = process.env.MAIL_PASSWORD;
const host = process.env.MAIL_HOST;

const transporter = nodemailer.createTransport({
    port: port,
    host: host,
    auth: {
        user: user,
        pass: pass,
    },
    secure: false,
    tls: {
        rejectUnauthorized: false,
    }
});

function sendMail(from, to, subject, text) {
    const mailData = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log(err);
        } 
        else {
            console.log(info);
        }
    });
}

module.exports = sendMail;