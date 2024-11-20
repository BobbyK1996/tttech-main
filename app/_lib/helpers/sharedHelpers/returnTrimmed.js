/**
 * Recursively trims whitespace from strings within various data types (string, array, object).
 * If the input is a none of the above, the input is returned, unchanged.
 *
 * @function returnTrimmed
 * @param {*} toTrim - The input data to be processed. Accepts all input types, including string, array, object, number, boolean or File.
 * @returns {*} - Returns the trimmed version of the input:
 *   - If it's a string, returns a trimmed string.
 *   - If it's an array, returns a new array with all string elements trimmed.
 *   - If it's an object, returns a new object with all string values trimmed.
 *   - If it's a File, returns the File as-is.
 *   - For other data types, returns the input unchanged.
 */

function returnTrimmed(toTrim) {
  if (toTrim instanceof File) {
    return toTrim;
  }

  if (typeof toTrim === 'string') return toTrim.trim();

  if (Array.isArray(toTrim)) {
    return toTrim.map((item) => returnTrimmed(item));
  }

  if (typeof toTrim === 'object' && toTrim !== null && !Array.isArray(toTrim)) {
    const trimmedObject = {};

    Object.keys(toTrim).forEach((key) => {
      if (typeof toTrim[key] === 'string') {
        trimmedObject[key] = toTrim[key].trim();
      } else if (typeof toTrim[key] === 'object') {
        trimmedObject[key] = returnTrimmed(toTrim[key]);
      } else {
        trimmedObject[key] = toTrim[key];
      }
    });

    return trimmedObject;
  }

  return toTrim;
}

export default returnTrimmed;
