'use server';

import {
  returnTrimmed,
  isValidName,
  isValidEmail,
  isValidType,
  isValidMessage,
} from '@/app/_lib/helperShared';
import { sendMail } from '@lib/mail';

export async function sendContactForm(formData) {
  const trimmedData = returnTrimmed(formData);

  const { name, email, type, message } = trimmedData;

  const nameValid = isValidName(name);
  const emailValid = isValidEmail(email);
  const typeValid = isValidType(type, ['Company', 'Candidate']);
  const messageValid = isValidMessage(message);

  if (!nameValid || !emailValid || !typeValid || !messageValid) {
    console.error('Validation failed:', {
      name: { valid: nameValid, value: name },
      email: { valid: emailValid, value: email },
      type: { valid: typeValid, value: type },
      message: { valid: messageValid, value: message },
    });

    return {
      status: 'failed',
      message: 'Validation failed. Please check inputs',
    };
  }

  try {
    const body = `
    <h1>New Message</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Type:</strong> ${type}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

    await sendMail({
      to: 'freestuffpls12345@gmail.com',
      subject: `New Message from ${name} (${type})`,
      body: body,
    });

    console.log('EMAIL SENT SUCCESSFULLY');
    return { status: 'success', message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending mail occured:', error.message);
    return { status: 'failed', message: 'Failed to send email' };
  }
}
