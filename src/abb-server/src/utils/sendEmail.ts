import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, html: string) => {
  nodemailer.createTestAccount((err1, account) => {
    if (err1) {
      console.error(err1);
    }
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = {
      from: 'Sender Name <sender@example.com>',
      to,
      subject: 'Nodemailer is unicode friendly ✔',
      text: 'Hello to myself!',
      html,
    };
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(`send email error occured ${err.message}`);
      }
      console.log(`Message sent %s ${info.messageId}`);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
};
