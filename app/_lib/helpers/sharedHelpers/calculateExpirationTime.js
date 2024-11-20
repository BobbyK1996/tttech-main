/**
 * Calculates the expiration time for a token based on its lifespan and an optional buffer.
 *
 * @function calculateExpirationTime
 * @param {number} expires_in - The lifespan of the token in seconds.
 * @param {number} [buffer=0] - An optional buffer time in seconds to subtract from the expiration time. Defaults to 0.
 * @returns {number} - The calculated expiration time in milliseconds since the UNIX epoch.
 */

function calculateExpirationTime(expires_in, buffer = 0) {
  return Date.now() + expires_in * 1000 - buffer * 1000;
}

export default calculateExpirationTime;
