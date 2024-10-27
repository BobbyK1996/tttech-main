/**
 * Validates if the provided value is a non-empty string.
 *
 * @param {any} value - The value to be validated.
 * @param {string} name - The name of the value, used in the error message.
 * @param {string} [notes=''] - Optional notes to provide additional context for the error message.
 * @throws {Error} Throws an error if the value is defined but is not a string.
 * @returns {boolean} Returns `true` if the value is a non-empty string, otherwise `false`.
 */

function validateString(value, name, notes = '') {
  if (value !== undefined && (value === null || typeof value !== 'string')) {
    throw new Error(`${name} must be a string. ${notes}. Current: ${value}`);
  }

  return typeof value === 'string' && value.trim().length > 0;
}

export default validateString;
