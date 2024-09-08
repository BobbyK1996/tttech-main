export function validateString(value, name, notes) {
  if (
    value === null ||
    value === undefined ||
    typeof value !== 'string' ||
    value.trim() === ''
  ) {
    throw new Error(`${name} must be a string. ${notes}.`);
  }
}

export function validateObject(value, name, notes) {
  if (typeof value !== 'object' || value === null) {
    throw new Error(`${name} must be an object. ${notes}.`);
  }
}

export function convertToHttps(url) {
  if (typeof url !== 'string') {
    throw new Error('The URL must be a string');
  }

  return `https://${url.replace(/^https?:\/\//, '')}`;
}

export function isValidEmail(email) {
  validateString(
    email,
    'Email',
    'Please provide a valid email address as a string'
  );
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function isValidGMapsLink(addressLink) {
  validateString(
    addressLink,
    'Address Link',
    'Please provide a valid Google Maps share URL as a string'
  );

  const googleMapsPattern = /^https:\/\/maps\.app\.goo\.gl\/.+/;

  return googleMapsPattern.test(addressLink);
}

export function isValidPhoneNumber(phoneNumber) {
  validateString(
    phoneNumber,
    'Phone Number',
    'Please provide a valid UK phone number as a string'
  );

  const phonePattern = /^(?:0\d{10}|\+44\d{10})$/;

  return phonePattern.test(phoneNumber);
}
