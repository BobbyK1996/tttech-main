/**
 * Validates if the provided value is a valid object.
 *
 * @param {any} value - The value to be validated.
 * @param {string} name - The name of the value, used in the error message.
 * @param {string} [notes=''] - Optional notes to provide additional context in the error message.
 * @returns {boolean} Returns `true` if the value is a valid object, otherwise `false`.
 * @throws {void} Logs an error to the console if the value is not a valid object.
 */

function validateObject(value, name, notes = '') {
  if (value !== undefined && (typeof value !== 'object' || value === null)) {
    console.error(`${name} must be a valid object. ${notes}.`);
    return false;
  }

  return value !== undefined;
}

export default validateObject;
