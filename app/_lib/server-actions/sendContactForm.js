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

  try {
    if (!isValidName(name)) return;
    if (!isValidEmail(email)) return;
    if (!isValidType(type, ['Company', 'Candidate'])) return;
    if (!isValidMessage(message)) return;
  } catch (error) {
    console.log('Validation failed:', error.message);
  }

  console.log('Validation passed:', name, email, type, message);

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
    name: 'Bobby',
    subject: `New Message from ${name} (${type})`,
    body: body,
  });

  console.log('EMAIL SENT SUCCESSFULLY');
}
