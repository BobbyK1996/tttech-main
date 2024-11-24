import { convertToHttps } from '@helpers/indexShared';
import { isValidElement } from 'react';

function validateSocials(socials = []) {
  if (!Array.isArray(socials)) {
    throw new Error('Expected an array for socials');
  }

  socials.forEach((social, index) => {
    if (typeof social !== 'object' || social === null)
      throw new Error(
        `Social item at index ${index} is not an object. Please return an object in the form of {logo: ReactElement, href: String, newTab: Boolean}`,
      );

    const { logo, newTab } = social;
    let { href } = social;

    if (isValidElement(logo) === false)
      throw new Error(
        `Logo at index ${index} must be a valid React element. It is recommended to use react-icons library`,
      );

    if (typeof href !== 'string')
      throw new Error(`href at index ${index} must be a valid URL string`);

    href = convertToHttps(href);
    social.href = href;

    if (typeof newTab !== 'boolean')
      throw new Error(`newTab at index ${index} must be a boolean`);
  });
}

export default validateSocials;
