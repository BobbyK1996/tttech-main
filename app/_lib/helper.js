import { convertToHttps } from '@lib/helperShared';
import { isValidElement } from 'react';

export function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

export function formatToK(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k';
  }
  return number.toString();
}

export function convertToObject(data, index = 0) {
  try {
    const categories = data[index].categories.map((categoryString) => {
      const jsonString = categoryString
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":');
      return JSON.parse(jsonString);
    });

    console.log(categories);
    return categories;
  } catch (error) {
    console.error('Error parsing categories:', error);
    return null;
  }
}

export function formatDate(inputDate) {
  const dateObj = new Date(inputDate);
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[monthIndex];

  return `${day} ${month} ${year}`;
}

export function validateSalaryString(s) {
  if (typeof s !== 'string') {
    return 0;
  }

  const pattern = /^(\d+)\s*-\s*(\d+)$/;

  const match = s.match(pattern);

  if (match) {
    const [_, x, y] = match;

    const numX = parseInt(x, 10);
    const numY = parseInt(y, 10);

    if (!isNaN(numX) && !isNaN(numY)) {
      return s;
    }
  }

  return 0;
}

function validateString(value, name, notes) {
  if (value && typeof value !== 'string') {
    throw new Error(`${name} must be a string. ${notes}.`);
  }
}

function validateObject(value, name, notes) {
  if (typeof value !== 'object' || value === null) {
    throw new Error(`${name} must be an object. ${notes}.`);
  }
}

export function validateLogoDescription({
  customCSS = '',
  logoSettings = {},
  contentSettings = {},
} = {}) {
  validateString(
    customCSS,
    'customCSS',
    'The string must be valid TailwindCSS'
  );

  validateObject(
    logoSettings,
    'logoSettings',
    'Possible keys include content, alt, width and height'
  );

  const {
    content: logoContent,
    alt: logoAlt,
    width: logoWidth,
    height: logoHeight,
  } = logoSettings;

  if (
    logoContent &&
    typeof logoContent !== 'string' &&
    !(typeof logoContent === 'object' && typeof logoContent.src === 'string')
  ) {
    throw new Error(
      'logoSettings.content must be a string (URL) or an object with a `src` property representing the logo URL.'
    );
  }

  validateString(
    logoAlt,
    'logoSettings.alt',
    'The string must describe the logo'
  );

  validateString(
    logoWidth,
    'logoSettings.width',
    'The string must be a valid TailwindCSS class'
  );

  validateString(
    logoHeight,
    'logoSettings.height',
    'The string must be a valid TailwindCSS class'
  );

  validateObject(
    contentSettings,
    'contentSettings',
    'Possible keys include header and body. Each of these keys also have possible keys of color and content'
  );

  const { header = {}, body = {} } = contentSettings;

  validateObject(
    header,
    'contentSettings.header',
    'Possible keys include color and content'
  );

  const { color: headerColor, content: headerContent } = header;

  validateString(
    headerColor,
    'contentSettings.header.color',
    'The string must represent a TailwindCSS color class'
  );
  validateString(
    headerContent,
    'contentSettings.header.content',
    'The string must represent the header content'
  );

  validateObject(
    body,
    'contentSettings.body',
    'Possible keys of color and content'
  );

  const { color: bodyColor, content: bodyContent } = body;

  validateString(
    bodyColor,
    'contentSettings.body.color',
    'The string must represent a TailwindCSS color class'
  );
  validateString(
    bodyContent,
    'contentSettings.body.content',
    'The string must represent the body content'
  );
}

export function validateSocials(socials = []) {
  if (!Array.isArray(socials)) {
    throw new Error('Expected an array for socials');
  }

  socials.forEach((social, index) => {
    if (typeof social !== 'object' || social === null)
      throw new Error(
        `Social item at index ${index} is not an object. Please return an object in the form of {logo: ReactElement, href: String, newTab: Boolean}`
      );

    const { logo, newTab } = social;
    let { href } = social;

    if (isValidElement(logo) === false)
      throw new Error(
        `Logo at index ${index} must be a valid React element. It is recommended to use react-icons library`
      );

    if (typeof href !== 'string')
      throw new Error(`href at index ${index} must be a valid URL string`);

    href = convertToHttps(href);
    social.href = href;

    if (typeof newTab !== 'boolean')
      throw new Error(`newTab at index ${index} must be a boolean`);
  });
}
