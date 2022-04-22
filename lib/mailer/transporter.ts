const nodemailer = require('nodemailer');
const transporterOptions = {
  host: process.env.TRANSPORT_HOST,
  port: process.env.TRANSPORT_PORT,
  auth: {
    user: process.env.TRANSPORT_EMAIL,
    pass: process.env.TRANSPORT_EMAIL_PASSWORD,
  },
};
export const transporter = nodemailer.createTransport(transporterOptions);
