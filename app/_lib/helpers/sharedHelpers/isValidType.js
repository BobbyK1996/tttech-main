/**
 * Validates whether a given type is a valid string and is included in a list of acceptable types.
 *
 * @function isValidType
 * @param {string} type - The type to validate.
 * @param {Array<string>} [validTypes=[]] - An array of valid types. Defaults to an empty array if not provided.
 * @returns {boolean} - Returns `true` if the type is a valid string and is found in the validTypes array, otherwise `false`.
 * @throws {Error} If `validTypes` is not an array.
 */

import { validateString } from '@helpers/indexShared';

function isValidType(type, validTypes = []) {
  if (!Array.isArray(validTypes))
    throw new Error('validTypes must be an array');

  const isValidString = validateString(type, 'Dropdown type');

  return validTypes.includes(type) && isValidString;
}

export default isValidType;
