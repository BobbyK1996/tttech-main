import nodemailer from 'nodemailer';
import { isValidEmail, validateString } from '@lib/helperShared';

export async function sendMail({ to, subject, body }) {
  if (!isValidEmail(to)) return;
  validateString(subject, 'Subject');
  validateString(body, 'Body');

  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
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
