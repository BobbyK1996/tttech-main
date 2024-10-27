/**
 * Validates a name to ensure it is a valid string and conforms to specified length and format requirements.
 *
 * @param {string} name - The name to be validated.
 * @returns {Object} An object containing:
 *   - {boolean} status - Indicates whether the name is valid.
 *   - {string} message - A message indicating the result of the validation.
 * @throws {Error} Throws an error if the provided name is not a valid string.
 */

import { validateString } from '@helpers/indexShared';

function isValidName(name) {
  const isValidString = validateString(name, 'Name');

  const namePattern = /^[a-zA-Z\s'-]+$/;

  const returnBool =
    !(name.length < 3 || name.length > 100) &&
    namePattern.test(name) &&
    isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Name is valid'
      : 'Name is invalid. Please ensure that name is between 3 and 100 characters long',
  };
}

export default isValidName;
