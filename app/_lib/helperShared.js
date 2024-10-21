export function validateString(value, name, notes = '') {
  if (value !== undefined && (value === null || typeof value !== 'string')) {
    throw new Error(`${name} must be a string. ${notes}. Current: ${value}`);
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

  const returnBool =
    email.length <= 256 && emailPattern.test(email) && isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Email is valid'
      : 'Email is invalid. Please ensure that a valid email format is used (e.g. example@gmail.com)',
  };
}

export function isValidName(name) {
  const isValidString = validateString(name, 'Name');

  const namePattern = /^[a-zA-Z\s'-]+$/;

  const returnBool =
    !(name.length < 3 || name.length > 100) &&
    namePattern.test(name) &&
    isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Name is valid'
      : 'Name is invalid. Please ensure that name is between 3 and 100 characters long',
  };
}

export function isValidJobTitle(title) {
  const isValidString = validateString(title, 'Title');

  const jobPattern = /^[a-zA-Z0-9\s\-'.()&]+$/;

  const returnBool =
    !(title.length < 3 || title.length > 100) &&
    jobPattern.test(title) &&
    isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Job Title is valid'
      : 'Job Title is invalid. Please ensure that Job Title is between 3 and 100 characters long',
  };
}

export function isValidUrl(url, linkedin = false) {
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

export function isValidType(type, validTypes = []) {
  if (!Array.isArray(validTypes))
    throw new Error('validTypes must be an array');

  const isValidString = validateString(type, 'Dropdown type');

  return validTypes.includes(type) && isValidString;
}

export function isValidMessage(message) {
  const isValidString = validateString(message, 'Message');

  const returnBool =
    !(message.length < 10 || message.length > 1000) && isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Message is valid'
      : 'Message is invalid. Please ensure that the message is between 10 and 1000 characters long',
  };
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

  const returnBool = phonePattern.test(phoneNumber) && isValidString;

  return {
    status: returnBool,
    message: returnBool
      ? 'Phone number is valid'
      : 'Phone number is invalid. Please provide a valid UK mobile or landline number. Valid formats include 01234 567 890 or +44 1234 567 890',
  };
}

export function returnTrimmed(toTrim) {
  if (toTrim instanceof File) {
    return toTrim;
  }

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

export const validateFields = (fields, validators, isRequired = true) => {
  const isValidFields = validateObject(fields, 'Fields');
  const isValidValidators = validateObject(validators, 'Validators');
  const isValidRequired = typeof isRequired === 'boolean';

  if (!isValidFields || !isValidValidators || !isValidRequired) {
    console.error(
      'Developer error. One of the fields in validateFields is not the correct type',
    );

    return;
  }

  return Object.keys(fields).reduce((results, key) => {
    const value = fields[key];

    const validator = isRequired
      ? validators?.required[key]
      : validators?.optional[key];

    if (!validator) return results;

    if (isRequired) {
      results.push(validator(value).status);
    } else {
      results.push(value !== '' ? validator(value).status : true);
    }

    return results;
  }, []);
};

export function isTokenValid(expirationTime) {
  return Date.now() < expirationTime;
}

export function calculateExpirationTime(expires_in, buffer = 0) {
  return Date.now() + expires_in * 1000 - buffer * 1000;
}
