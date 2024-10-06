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
  if (value !== undefined && (typeof value !== 'object' || value === null)) {
    console.error(`${name} must be a valid object. ${notes}.`);
    return false;
  }

  return value !== undefined;
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

export function isValidJobTitle(title) {
  const isValidString = validateString(title, 'Title');

  const jobPattern = /^[a-zA-Z0-9\s\-'.()&]+$/;

  return (
    !(title.length < 3 || title.length > 100) &&
    jobPattern.test(title) &&
    isValidString
  );
}

export function isValidUrl(url, linkedin = false) {
  const isValidString = validateString(url, 'url');
  const isValidLinkedinBoolean = typeof linkedin === 'boolean';

  if (!isValidLinkedinBoolean)
    throw new Error('The "linkedin" parameter must be a boolean');

  const urlPattern = linkedin
    ? /^(https?:\/\/)?(www\.)?(linkedin\.com)?\/in\/[a-zA-Z0-9-]+\/?$/
    : /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

  return url.length <= 256 && urlPattern.test(url) && isValidString;
}

export function validateFile(file, allowedTypes = [], maxSizeInMB = 1) {
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

  if (!(file instanceof File)) {
    console.error('Provided value is not a valid file');
    return {
      status: false,
      message: 'Provided value is not a valid file',
    };
  }

  if (file.size === 0) {
    console.error('The file is empty (0 bytes)');
    return {
      status: false,
      message: 'The file is empty (0 bytes)',
    };
  }

  const allowedTypeNames = allowedTypes.map((item) => item.name);
  const allowedTypeValues = allowedTypes.map((item) => item.type);
  const isValidType =
    allowedTypeValues.length === 0 || allowedTypeValues.includes(file.type);

  if (!isValidType) {
    console.error(
      `Invalid file type. Allowed types: ${allowedTypeNames.join(', ')}. Provided: ${file.type}`,
    );
    return {
      status: false,
      message: `Invalid file type. Allowed types: ${allowedTypeNames.join(', ')}. Provided: ${file.type}`,
    };
  }

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  const isValidSize = file.size <= maxSizeInBytes;

  if (!isValidSize) {
    console.error(`File size exceeds the limit of ${maxSizeInMB} MB`);
    return {
      status: false,
      message: `File size exceeds the limit of ${maxSizeInMB} MB`,
    };
  }

  return {
    status: true,
    message: `Everything ok`,
  };
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

  const phonePattern =
    /^(?:0\d{3}\s?\d{3}\s?\d{4}|(?:\+?44)\d{3}\s?\d{3}\s?\d{4})$/;

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
