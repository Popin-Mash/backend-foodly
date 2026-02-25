const nodemailer = require('nodemailer');


async function sendEmail(userEmail, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: 'Foodly verification code',
        html: `<h1>Foodly Email Verification</h1>
                <p>Your verification code is:</p>
                <h2style="color:red;">${message}</h2style=>
                <p>please enter this code on the verification page to complete your register process</p>`
    }
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;