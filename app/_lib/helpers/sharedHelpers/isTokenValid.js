/**
 * Checks whether a token is still valid based on its expiration time.
 *
 * @function isTokenValid
 * @param {number} expirationTime - The expiration time of the token in milliseconds since the UNIX epoch.
 * @returns {boolean} - `true` if the current time is before the expiration time, otherwise `false`.
 */

function isTokenValid(expirationTime) {
  return Date.now() < expirationTime;
}

export default isTokenValid;
