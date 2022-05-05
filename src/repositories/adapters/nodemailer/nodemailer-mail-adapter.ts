import { MailAdapter, SendMailData } from "../mail-adapters";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "eb9df7e09c91b7",
    pass: "15917c19188667"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendmail({subject, body}: SendMailData) {
      await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Igor Garcia <igorgarciaco@gmail.com>',
    subject,
    html: body,
  })
  };
}