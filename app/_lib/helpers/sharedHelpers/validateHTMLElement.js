/**
 * Validates if the provided value is a valid HTML element.
 *
 * @param {any} value - The value to be validated.
 * @param {string} name - The name of the value, used in the error message.
 * @param {string} [notes=''] - Optional notes to provide additional context in the error message.
 * @returns {boolean} Returns `true` if the value is a valid HTML element, otherwise `false`.
 * @throws {void} Logs an error to the console if the value is not a valid HTML element.
 */

function validateHTMLElement(value, name, notes = '') {
  if (
    value !== undefined &&
    (value === null || !(value instanceof HTMLElement))
  ) {
    console.error(`${name} must be a valid HTML element. ${notes}.`);
    return false;
  }

  return value !== undefined;
}

export default validateHTMLElement;
