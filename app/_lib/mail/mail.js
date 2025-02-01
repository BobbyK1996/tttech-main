import nodemailer from 'nodemailer';
import { isValidEmail, validateString } from '@helpers/indexShared';

export async function sendMail({ to, subject, body }) {
  if (!isValidEmail(to).status) return;
  const isValidStringSubject = validateString(subject, 'Subject');
  const isValidStringBody = validateString(body, 'Body');

  if (!isValidStringSubject && !isValidStringBody)
    throw new Error(
      'subject and body must be valid strings. Subject can be an interpolated header. Body needs to be valid html',
    );

  const {
    SMTP_HOST,
    SMTP_EMAIL,
    SMTP_CLIENT_ID,
    SMTP_CLIENT_SECRET,
    SMTP_REFRESH_TOKEN,
    SMTP_ACCESS_TOKEN,
  } = process.env;

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    secure: false,
    port: 587,
    auth: {
      type: 'OAuth2',
      user: SMTP_EMAIL,
      clientId: SMTP_CLIENT_ID,
      clientSecret: SMTP_CLIENT_SECRET,
      refreshToken: SMTP_REFRESH_TOKEN,
      accessToken: SMTP_ACCESS_TOKEN,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });

    console.log(sendResult);
  } catch (error) {
    console.log(error);
    return;
  }
}
