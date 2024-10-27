/**
 * Validates if the provided value is a valid number.
 *
 * @param {any} value - The value to be validated.
 * @param {string} name - The name of the value, used in the error message.
 * @param {string} [notes=''] - Optional notes to provide additional context in the error message.
 * @returns {boolean} Returns `true` if the value is a valid number, otherwise `false`.
 * @throws {void} Logs an error to the console if the value is not a valid number.
 */

function validateNumber(value, name, notes = '') {
  if (
    value !== undefined &&
    (value === null || typeof value !== 'number' || isNaN(value))
  ) {
    console.error(`${name} must be a number. ${notes}.`);
    return false;
  }

  return value !== undefined;
}

export default validateNumber;
