/**
 * Validates a message to ensure it is a string and falls within a specified length range.
 *
 * @function isValidMessage
 * @param {string} message - The message to validate.
 * @returns {Object} - An object containing:
 *  - `status` {boolean}: Indicates whether the message is valid.
 *  - `message` {string}: A descriptive message indicating the validation result.
 *
 * @throws {Error} If the input is not a valid string.
 */

import { validateString } from '@helpers/indexShared';

function isValidMessage(message) {
  const isValidString = validateString(message, 'Message');

  const returnBool =
    !(message.length < 10 || message.length > 1000) && isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Message is valid'
      : 'Message is invalid. Please ensure that the message is between 10 and 1000 characters long',
  };
}

export default isValidMessage;
