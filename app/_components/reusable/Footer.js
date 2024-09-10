import { validateSocials } from '@lib/helper';
import {
  logoSettings,
  contentSettings,
  socials,
  contactData,
  details,
} from '@lib/data';

import LogoDescription from '@components/reusable/LogoDescription';
import Navigation from '@components/reusable/Navigation';
import Socials from '@components/reusable/Socials';
import ContactDetails from '@components/reusable/ContactDetails';
import CompaniesHouse from '@components/reusable/CompaniesHouse';

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

        <CompaniesHouse details={details} />
      </div>
    </div>
  );
}

export default Footer;
