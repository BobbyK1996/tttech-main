/**
 * Converts a given URL to HTTPS by removing any existing HTTP or HTTPS protocol and prepending 'https://'.
 *
 * @param {string} url - The URL to be converted.
 * @returns {string} The converted URL with the HTTPS protocol.
 * @throws {Error} Throws an error if the provided URL is not a string.
 */

import { validateString } from '@helpers/indexShared';

function convertToHttps(url) {
  if (!validateString(url)) {
    throw new Error('The URL must be a string');
  }

  return `https://${url.replace(/^https?:\/\//, '')}`;
}

export default convertToHttps;
