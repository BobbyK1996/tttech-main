/**
 * Validates whether a given phone number is a properly formatted UK phone number.
 *
 * @function isValidPhoneNumber
 * @param {string} phoneNumber - The phone number to validate. This can include UK mobile or landline formats.
 * @returns {Object} - An object containing:
 *   - `status` {boolean}: `true` if the phone number is valid, following a regex, otherwise `false`. Allows +44, 44 and 0 and number prefix.
 *   - `message` {string}: A descriptive message indicating whether the phone number is valid or not.
 *
 * @throws {Error} If the input is not a valid string or does not match the expected format.
 */

import { validateString } from '@helpers/indexShared';

function isValidPhoneNumber(phoneNumber) {
  const isValidString = validateString(
    phoneNumber,
    'Phone Number',
    'Please provide a valid UK phone number as a string',
  );

  const phonePattern =
    /^(?:0\d{3}\s?\d{3}\s?\d{4}|(?:\+?44)\d{3}\s?\d{3}\s?\d{4})$/;

  const returnBool = phonePattern.test(phoneNumber) && isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Phone number is valid'
      : 'Phone number is invalid. Please provide a valid UK mobile or landline number. Valid formats include 01234 567 890 or +44 1234 567 890',
  };
}

export default isValidPhoneNumber;
