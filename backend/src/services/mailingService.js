import transporter from "../config/emailConfig";
import {AppError} from "../utils/errors";

const sendMail = async ({ to, subject, text }) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new AppError("Failed to send email", 500);
        }
        console.log('Email sent: ', info.response);
    });
}

const mailingService = {
    sendMail
}

export default mailingService;