import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";

export class MailTrapMailProvider implements IMailProvider{
  private transporter: Mail;

  constructor(){
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2cd61b767baff3",
        pass: "793561d707a32f"
      }
    });
  }

  async sendMail(message: IMessage): Promise<void>{
    await  this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }

}