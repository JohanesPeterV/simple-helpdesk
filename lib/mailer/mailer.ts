import { transporter } from './transporter';
import { EmailDetail } from '../../models/email-detail';

function getHtml(content: string) {
  return `<p>${content}</p>`;
}

export default class Mailer {
  static async sendEmail(recepient: string, emailDetail: EmailDetail) {
    return await transporter.sendMail({
      from: process.env.TRANSPORT_EMAIL,
      to: recepient,
      subject: emailDetail.subject,
      html: getHtml(emailDetail.content),
    });
  }
}
