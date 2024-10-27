/**
 * Validates an email address to ensure it is a valid string and conforms to standard email format.
 *
 * @param {string} email - The email address to be validated.
 * @returns {Object} An object containing:
 *   - {boolean} status - Indicates whether the email is valid.
 *   - {string} message - A message indicating the result of the validation.
 * @throws {Error} Throws an error if the provided email is not a valid string.
 */

import { validateString } from '@helpers/indexShared';

function isValidEmail(email) {
  const isValidString = validateString(
    email,
    'Email',
    'Please provide a valid email address as a string',
  );

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const returnBool =
    email.length <= 256 && emailPattern.test(email) && isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Email is valid'
      : 'Email is invalid. Please ensure that a valid email format is used (e.g. example@gmail.com)',
  };
}

export default isValidEmail;
