export function validateString(value, name, notes = '') {
  if (value !== undefined && (value === null || typeof value !== 'string')) {
    throw new Error(`${name} must be a string. ${notes}.`);
  }

  return typeof value === 'string' && value.trim().length > 0;
}

export function validateNumber(value, name, notes = '') {
  if (
    value !== undefined &&
    (value === null || typeof value !== 'number' || isNaN(value))
  ) {
    console.error(`${name} must be a number. ${notes}.`);
    return false;
  }

  return value !== undefined;
}

export function validateFunction(value, name, notes = '') {
  if (value !== undefined && (value === null || typeof value !== 'function')) {
    console.error(`${name} must be a function. ${notes}.`);
    return false;
  }

  return value !== undefined;
}

export function validateHTMLElement(value, name, notes = '') {
  if (
    value !== undefined &&
    (value === null || !(value instanceof HTMLElement))
  ) {
    console.error(`${name} must be a valid HTML element. ${notes}.`);
    return false;
  }

  return value !== undefined;
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
  const isValidString = validateString(
    email,
    'Email',
    'Please provide a valid email address as a string',
  );

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return email.length <= 256 && emailPattern.test(email) && isValidString;
}

export function isValidName(name) {
  const isValidString = validateString(name, 'Name');

  const namePattern = /^[a-zA-Z\s'-]+$/;

  return (
    !(name.length < 3 || name.length > 100) &&
    namePattern.test(name) &&
    isValidString
  );
}

export function isValidType(type, validTypes = []) {
  if (!Array.isArray(validTypes))
    throw new Error('validTypes must be an array');

  const isValidString = validateString(type, 'Dropdown type');

  return validTypes.includes(type) && isValidString;
}

export function isValidMessage(message) {
  const isValidString = validateString(message, 'Message');

  return !(message.length < 10 || message.length > 1000) && isValidString;
}

export function isValidGMapsLink(addressLink) {
  const isValidString = validateString(
    addressLink,
    'Address Link',
    'Please provide a valid Google Maps share URL as a string',
  );

  const googleMapsPattern = /^https:\/\/maps\.app\.goo\.gl\/.+/;

  return googleMapsPattern.test(addressLink) && isValidString;
}

export function isValidPhoneNumber(phoneNumber) {
  const isValidString = validateString(
    phoneNumber,
    'Phone Number',
    'Please provide a valid UK phone number as a string',
  );

  //Allows 0XXXXXXXXXX and +44XXXXXXXXXX
  // const phonePattern = /^(?:0\d{10}|\+44\d{10})$/;

  //Allows 0XXXXXXXXXX, +44XXXXXXXXXX, 0XXX XXX XXXX and +44XXX XXX XXXX
  const phonePattern = /^(?:0\d{3}\s?\d{3}\s?\d{4}|\+44\d{3}\s?\d{3}\s?\d{4})$/;

  return phonePattern.test(phoneNumber) && isValidString;
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
