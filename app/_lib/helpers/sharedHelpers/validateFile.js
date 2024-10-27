/**
 * Validates a file to ensure it meets specified type and size requirements.
 *
 * @param {File} file - The file to be validated.
 * @param {Array<{ name: string, type: string }>} [allowedTypes=[]] - An optional array of allowed file types, each represented as an object with `name` and `type` properties.
 * @param {number} [maxSizeInMB=1] - An optional maximum file size in megabytes. Defaults to 1 MB.
 * @returns {Object} An object containing:
 *   - {boolean} status - Indicates whether the file is valid.
 *   - {string} message - A message indicating the result of the validation.
 * @throws {void} Logs an error message to the console if the parameters are not valid or if validation fails. Returns an object indicating failure if validation fails
 */

function validateFile(file, allowedTypes = [], maxSizeInMB = 1) {
  if (!Array.isArray(allowedTypes)) {
    console.error('Developer error. Please pass an array for allowedTypes');
    return {
      status: false,
      message: 'Developer error. Please pass an array for allowedTypes',
    };
  }

  if (!validateNumber(maxSizeInMB, 'maxSizeInMB')) {
    console.error('Developer error. Please pass an number for maxSizeInMB');
    return {
      status: false,
      message: 'Developer error. Please pass an number for maxSizeInMB',
    };
  }

  if (!file)
    return {
      status: false,
      message: 'No file provided. Please include a file',
    };

  if (!(file instanceof File))
    return {
      status: false,
      message:
        'Provided value is not a valid file. Please do not edit the page structure',
    };

  if (file.size === 0)
    return {
      status: false,
      message: 'The file is empty (0 bytes). Please check your file.',
    };

  const allowedTypeNames = allowedTypes.map((item) => item.name);
  const allowedTypeValues = allowedTypes.map((item) => item.type);
  const isValidType =
    allowedTypeValues.length === 0 || allowedTypeValues.includes(file.type);

  if (!isValidType)
    return {
      status: false,
      message: `Invalid file type. Allowed types: ${allowedTypeNames.join(', ')}. Provided: ${file.type}`,
    };

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  if (file.size > maxSizeInBytes)
    return {
      status: false,
      message: `File is too large. Max size ${maxSizeInMB}MB. Provided: ${(file.size / (1024 * 1024)).toFixed(2)}MB`,
    };

  return {
    status: true,
    message: `File is valid`,
  };
}

export default validateFile;
