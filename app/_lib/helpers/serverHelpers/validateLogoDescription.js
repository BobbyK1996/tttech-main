import { validateString, validateObject } from '@helpers/indexShared';

function validateLogoDescription({
  customCSS = '',
  logoSettings = {},
  contentSettings = {},
} = {}) {
  validateString(
    customCSS,
    'customCSS',
    'The string must be valid TailwindCSS',
  );

  validateObject(
    logoSettings,
    'logoSettings',
    'Possible keys include content, alt, width and height',
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
      'logoSettings.content must be a string (URL) or an object with a `src` property representing the logo URL.',
    );
  }

  validateString(
    logoAlt,
    'logoSettings.alt',
    'The string must describe the logo',
  );

  validateString(
    logoWidth,
    'logoSettings.width',
    'The string must be a valid TailwindCSS class',
  );

  validateString(
    logoHeight,
    'logoSettings.height',
    'The string must be a valid TailwindCSS class',
  );

  validateObject(
    contentSettings,
    'contentSettings',
    'Possible keys include header and body. Each of these keys also have possible keys of color and content',
  );

  const { header = {}, body = {} } = contentSettings;

  validateObject(
    header,
    'contentSettings.header',
    'Possible keys include color and content',
  );

  const { color: headerColor, content: headerContent } = header;

  validateString(
    headerColor,
    'contentSettings.header.color',
    'The string must represent a TailwindCSS color class',
  );
  validateString(
    headerContent,
    'contentSettings.header.content',
    'The string must represent the header content',
  );

  validateObject(
    body,
    'contentSettings.body',
    'Possible keys of color and content',
  );

  const { color: bodyColor, content: bodyContent } = body;

  validateString(
    bodyColor,
    'contentSettings.body.color',
    'The string must represent a TailwindCSS color class',
  );
  validateString(
    bodyContent,
    'contentSettings.body.content',
    'The string must represent the body content',
  );
}

export default validateLogoDescription;
