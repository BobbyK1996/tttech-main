/**
 * Validates whether a given address link is a properly formatted Google Maps share URL.
 *
 * @function isValidGMapsLink
 * @param {string} addressLink - The Google Maps share URL to validate.
 * @returns {boolean} - Returns `true` if the provided link is a valid Google Maps share URL (defined by regex) and is a valid string; otherwise, returns `false`.
 *
 * @throws {Error} If the input is not a valid string or does not match the expected format.
 */

import { validateString } from '@helpers/indexShared';

function isValidGMapsLink(addressLink) {
  const isValidString = validateString(
    addressLink,
    'Address Link',
    'Please provide a valid Google Maps share URL as a string',
  );

  const googleMapsPattern = /^https:\/\/maps\.app\.goo\.gl\/.+/;

  return googleMapsPattern.test(addressLink) && isValidString;
}

export default isValidGMapsLink;
