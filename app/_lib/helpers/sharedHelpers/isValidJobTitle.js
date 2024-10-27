/**
 * Validates a job title to ensure it is a valid string and conforms to specified length and format requirements.
 *
 * @param {string} title - The job title to be validated.
 * @returns {Object} An object containing:
 *   - {boolean} status - Indicates whether the job title is valid.
 *   - {string} message - A message indicating the result of the validation.
 * @throws {Error} Throws an error if the provided title is not a valid string.
 */

import { validateString } from '@helpers/indexShared';

function isValidJobTitle(title) {
  const isValidString = validateString(title, 'Title');

  const jobPattern = /^[a-zA-Z0-9\s\-'.()&]+$/;

  const returnBool =
    !(title.length < 3 || title.length > 100) &&
    jobPattern.test(title) &&
    isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Job Title is valid'
      : 'Job Title is invalid. Please ensure that Job Title is between 3 and 100 characters long',
  };
}

export default isValidJobTitle;
