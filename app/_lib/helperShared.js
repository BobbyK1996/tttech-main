export function validateString(value, name, notes = '') {
  if (value !== undefined && (value === null || typeof value !== 'string')) {
    throw new Error(`${name} must be a string. ${notes}.`);
  }

  if (value === undefined) return false;

  return value.trim().length > 0;
}

export function validateNumber(value, name, notes = '') {
  if (
    value !== undefined &&
    (value === null || typeof value !== 'number' || isNaN(value))
  ) {
    throw new Error(`${name} must be a number. ${notes}.`);
  }
}

export function validateObject(value, name, notes = '') {
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

  return email.length <= 256 && emailPattern.test(email);
}

export function isValidName(name) {
  validateString(name, 'Name');

  const namePattern = /^[a-zA-Z\s'-]+$/;

  return !(name.length < 3 || name.length > 100) && namePattern.test(name);
}

export function isValidType(type, validTypes = []) {
  if (!Array.isArray(validTypes))
    throw new Error('validTypes must be an array');

  validateString(type, 'Dropdown type');

  return validTypes.includes(type);
}

export function isValidMessage(message) {
  validateString(message, 'Message');

  return !(message.length < 10 || message.length > 1000);
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

  //Allows 0XXXXXXXXXX and +44XXXXXXXXXX
  // const phonePattern = /^(?:0\d{10}|\+44\d{10})$/;

  //Allows 0XXXXXXXXXX, +44XXXXXXXXXX, 0XXX XXX XXXX and +44XXX XXX XXXX
  const phonePattern = /^(?:0\d{3}\s?\d{3}\s?\d{4}|\+44\d{3}\s?\d{3}\s?\d{4})$/;

  return phonePattern.test(phoneNumber);
}

export function returnTrimmed(toTrim) {
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
