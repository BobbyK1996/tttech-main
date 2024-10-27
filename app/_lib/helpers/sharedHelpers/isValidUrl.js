/**
 * Validates a URL to ensure it is a valid string and conforms to specified URL format requirements.
 *
 * @param {string} url - The URL to be validated.
 * @param {boolean} [linkedin=false] - Optional parameter to specify if the URL is for a LinkedIn profile. Defaults to false.
 * @returns {Object} An object containing:
 *   - {boolean} status - Indicates whether the URL is valid.
 *   - {string} message - A message indicating the result of the validation.
 * @throws {Error} Throws an error if the provided URL is not a valid string or if the "linkedin" parameter is not a boolean.
 */

import { validateString } from '@helpers/indexShared';

function isValidUrl(url, linkedin = false) {
  const isValidString = validateString(url, 'url');
  const isValidLinkedinBoolean = typeof linkedin === 'boolean';

  if (!isValidLinkedinBoolean)
    throw new Error('The "linkedin" parameter must be a boolean');

  const urlPattern = linkedin
    ? /^(https?:\/\/)?(www\.)?(linkedin\.com)?\/in\/[a-zA-Z0-9-]+\/?$/
    : /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

  const returnBool = url.length <= 256 && urlPattern.test(url) && isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'URL is valid'
      : linkedin
        ? 'URL is invalid. Please provide a valid LinkedIn profile link, such as https://www.linkedin.com/in/username or www.linkedin.com/in/username or /in/username'
        : 'URL is invalid. Please provide a valid URL, such as https://www.example.com or https://example.com/page',
  };
}

export default isValidUrl;
