import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  // @ts-ignore
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendEmail(email: string, url: string) {
  const info = await transport.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: `<a href="${url}>${url}</a>"`,
  });
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', getTestMessageUrl(info));
}
