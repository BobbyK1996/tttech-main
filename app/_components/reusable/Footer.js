import { validateSocials } from '@lib/helper';
import { logoBase } from '@/public';

import LogoDescription from '@components/reusable/LogoDescription';
import Navigation from '@components/reusable/Navigation';
import Socials from '@components/reusable/Socials';

import {
  TiSocialLinkedinCircular,
  TiSocialInstagramCircular,
  TiSocialFacebookCircular,
  TiSocialTwitterCircular,
} from 'react-icons/ti';
import ContactDetails from './ContactDetails';

const logoSettings = {
  content: logoBase,
  alt: 'TT Tech Logo',
};

const contentSettings = {
  header: {
    content: 'TT Tech Talent',
  },
  body: {
    content:
      'A boutique recruitment company focusing on the Development, Support and Data industries',
  },
};

const socials = [
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

const contactData = {
  address:
    'Winsor & Newton Building, N Building, 26 Whitefriars Ave, Harrow, HA3 5RN',
  addressLink: 'https://maps.app.goo.gl/qBxCQQ5m8EjmwQdk9',
  email: 'info@tttechrec.com',
  phoneNumber: '+442035002721',
};

function Footer() {
  validateSocials(socials);

  return (
    <div className="w-full border-t shadow-2xl border-primary-900">
      <div className="grid w-full h-full grid-cols-[1fr,0.5fr,2fr] md:grid-cols-[0.5fr,0.5fr,0.75fr] md:gap-x-4 lg:grid-cols-[1fr,0.3fr,0.5fr,1fr] grid-rows-[1fr, auto] mx-auto max-w-7xl p-4 xl:px-0 gap-x-2">
        <LogoDescription
          customCSS={'hidden lg:flex'}
          logoSettings={logoSettings}
          contentSettings={contentSettings}
        />

        <div className="pl-6 md:ml-12 lg:ml-0">
          <h1 className="pb-4 font-extrabold text-primary-500">Browse</h1>
          <Navigation type="footer" />
        </div>

        <div className="text-center">
          <h1 className="pb-4 font-extrabold text-primary-500">Socials</h1>
          <Socials socials={socials} />
        </div>

        <div className="text-right sm:text-left">
          <h1 className="pb-4 font-extrabold text-primary-500">Contact</h1>
          <ContactDetails contact={contactData} />
        </div>

        <div className="flex flex-col items-center justify-center col-span-4 pt-10 mx-auto text-xs text-center before:content-[''] before:border-2 before:border-transparent before:border-t-primary-500 before:w-8/12 before:min-w-10 before:-translate-y-3">
          <a href="">
            <span>
              TT Tech Solutions LTD is a registered company in England and Wales
            </span>
          </a>
          <span>Company number: 11625905</span>
          <span>
            Registered address Unimix House, Platinum Suite, Abbey Road, London,
            England, NW10 7TR
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
