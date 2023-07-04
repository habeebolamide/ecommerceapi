const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require('fs');
const path = require("path");
require('dotenv').config();
const sendEmail = async (email, subject, payload, template) => {

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    // return console.log(process.env.EMAIL);
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;