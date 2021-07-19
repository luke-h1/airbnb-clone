import nodemailer from 'nodemailer';

export async function sendEthEmail(to: string, html: string, subject: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"airbnb clone"',
    to,
    subject: `airbnb clone | ${subject}`,
    html,
  });
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
