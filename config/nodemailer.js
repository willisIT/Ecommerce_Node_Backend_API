require('dotenv').config();
const nodemailer = require('nodemailer');


module.exports = nodemailer.createTransport({
    host: process.env.MAILTRAP,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
})