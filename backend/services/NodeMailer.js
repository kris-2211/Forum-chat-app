const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

let transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const sendMail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: " + info.response);
        return info;
    } catch (error) {
        console.error("Error in sending email: " + error);
        throw error; // Rethrow the error for handling in the caller
    }
};

module.exports = sendMail;
