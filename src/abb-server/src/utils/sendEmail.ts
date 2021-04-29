import nodemailer from 'nodemailer';

export const sendEmail = async (
  recipient: string,
  url: string,
  linkText: string,
) => {
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
      to: `Recipient <${recipient}>`,
      subject: 'Nodemailer is unicode friendly ✔',
      text: 'Hello to myself!',
      html: `<html>
          <body>
          <p>Testing</p>
          <a href="${url}">${linkText}</a>
          </body>
          </html>`,
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
