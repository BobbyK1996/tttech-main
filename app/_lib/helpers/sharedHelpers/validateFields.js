/**
 * Validates a set of fields against specified validation functions, considering required or optional criteria.
 *
 * @function validateFields
 * @param {Object} fields - An object where keys are field names and values are the data to be validated.
 * @param {Object} validators - An object containing validation functions for required and optional fields.
 *   - `{ required: Object, optional: Object }`: Keys correspond to field names, and values are validation functions.
 * @param {boolean} [isRequired=true] - Determines whether to validate against required or optional validators.
 *   - If `true`, required validators are used.
 *   - If `false`, optional validators are used, skipping empty values.
 * @returns {boolean[]|undefined} - An array of boolean results for each field's validation.
 *   - `true` indicates successful validation.
 *   - `false` indicates validation failure.
 *   - Returns `undefined` if any input parameter is of an invalid type.
 *
 * @throws {Error} - Logs an error if any of the input parameters are not valid.
 */

import { validateObject } from '@helpers/indexShared';

function validateFields(fields, validators, isRequired = true) {
  const isValidFields = validateObject(fields, 'Fields');
  const isValidValidators = validateObject(validators, 'Validators');
  const isValidRequired = typeof isRequired === 'boolean';

  if (!isValidFields || !isValidValidators || !isValidRequired) {
    console.error(
      'Developer error. One of the fields in validateFields is not the correct type',
    );

    return;
  }

  return Object.keys(fields).reduce((results, key) => {
    const value = fields[key];

    const validator = isRequired
      ? validators?.required[key]
      : validators?.optional[key];

    if (!validator) return results;

    if (isRequired) {
      results.push(validator(value).status);
    } else {
      results.push(value !== '' ? validator(value).status : true);
    }

    return results;
  }, []);
}

export default validateFields;
