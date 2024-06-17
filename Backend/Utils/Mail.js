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

async function sendMail(mailData) {
    return await transporter.sendMail(mailData);
}

module.exports = sendMail;