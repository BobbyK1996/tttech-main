import nodemailer from 'nodemailer';
import { isValidEmail, validateString } from '@lib/helperShared';

export async function sendMail({ to, subject, body }) {
  if (!isValidEmail(to)) return;
  const isValidStringSubject = validateString(subject, 'Subject');
  const isValidStringBody = validateString(body, 'Body');

  if (!isValidStringSubject && !isValidStringBody)
    throw new Error(
      'subject and body must be valid strings. Subject can be an interpolated header. Body needs to be valid html'
    );

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
