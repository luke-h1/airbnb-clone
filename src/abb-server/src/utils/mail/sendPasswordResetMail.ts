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

const formattedEmail = (text: string) => `
  <div style="
  border: 1px solid black;
  padding: 20px;    
  font-family: sans-serif;
  line-height: 2;
  font-size: 20px;
  ">
  <h2>Hello There!</h2>
  <P>${text}</p>
  <p>😘</p>
  </div>
  `;

interface MailResponse {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: { from: string; to: string[] };
  messageId: string;
}

export const sendPasswordResetMail = async (
  resetToken: string,
  to: string,
): Promise<void> => {
  const info = (await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset token!',
    html: formattedEmail(
      `Your password reset token is here! <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">click here to reset</a>`,
    ),
  })) as MailResponse;
  console.log(info);
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`✉️ Message sent! Preview it at ${getTestMessageUrl(info)}`);
  }
};
