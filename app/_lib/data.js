import { logoBase } from '@/public';

import {
  TiSocialLinkedinCircular,
  TiSocialInstagramCircular,
  TiSocialFacebookCircular,
  TiSocialTwitterCircular,
} from 'react-icons/ti';

export const logoSettings = {
  content: logoBase,
  alt: 'TT Tech Logo',
};

export const contentSettings = {
  header: {
    content: 'TT Tech Talent',
  },
  body: {
    content:
      'A boutique recruitment company focusing on the Development, Support and Data industries',
  },
};

export const socials = [
  {
    logo: <TiSocialLinkedinCircular />,
    href: 'https://www.linkedin.com/company/tttech-talent/',
    newTab: true,
  },
  {
    logo: <TiSocialInstagramCircular />,
    href: 'https://www.instagram.com/tttechtalent/',
    newTab: true,
  },
  {
    logo: <TiSocialTwitterCircular />,
    href: 'https://twitter.com/TTTechTalent',
    newTab: true,
  },
  {
    logo: <TiSocialFacebookCircular />,
    href: 'https://www.facebook.com/tttechtalent/',
    newTab: true,
  },
];

export const contactData = {
  address:
    'Winsor & Newton Building, N Building, 26 Whitefriars Ave, Harrow, HA3 5RN',
  addressLink: 'https://maps.app.goo.gl/qBxCQQ5m8EjmwQdk9',
  email: 'info@tttechrec.com',
  phoneNumber: '0203 500 2721',
};

export const details = {
  companyName: 'TT Tech Solutions',
  registrationLocation: 'England and Wales',
  registeredAddress:
    'Unimix House, Platinum Suite, Abbey Road, London, England, NW10 7TR',
  companyNumber: 11625905,
};
