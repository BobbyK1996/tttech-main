'use server';

import { isValidEmail, validateString } from '@/app/_lib/helperShared';
import { sendMail } from '@lib/mail';

export async function sendContactForm(formData) {
  // const name = formData.get('name');
  // const email = formData.get('email');
  // const type = formData.get('type');
  // const message = formData.get('message');

  const { name, email, type, message } = formData;

  try {
    if (!isValidEmail(email)) return;
    validateString(name, 'Name');
    validateString(
      type,
      'Type',
      'Please do not edit values for Company and Candidate dropdown'
    );
    validateString(message, 'Message');
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
