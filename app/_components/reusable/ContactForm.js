import { isValidEmail, validateString } from '@/app/_lib/helperShared';
import { sendMail } from '@lib/mail';

async function send(formData) {
  'use server';

  const name = formData.get('name');
  const email = formData.get('email');
  const type = formData.get('type');
  const message = formData.get('message');

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

function ContactForm() {
  return (
    <form className="w-full space-y-4 text-gray-700" action={send}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Are you a:
        </label>
        <select
          id="type"
          name="type"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        >
          <option value="Company">Company</option>
          <option value="Candidate">Candidate</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
