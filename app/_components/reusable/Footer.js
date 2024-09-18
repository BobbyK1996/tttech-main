import { validateSocials } from '@lib/helper';
import {
  LOGO_DESC_LOGO_DATA,
  LOGO_DESC_DESC_DATA,
  SOCIALS_DATA,
  CONTACT_DATA,
  LOCATION_DETAILS,
} from '@lib/data';

import LogoDescription from '@components/reusable/LogoDescription';
import Navigation from '@components/reusable/Navigation';
import Socials from '@components/reusable/Socials';
import ContactDetails from '@components/reusable/ContactDetails';
import CompaniesHouse from '@components/reusable/CompaniesHouse';

function Footer() {
  validateSocials(SOCIALS_DATA);

  return (
    <div className="w-full border-t shadow-2xl border-primary-900">
      <div className="grid w-full h-full grid-cols-[1fr,0.5fr,2fr] md:grid-cols-[0.5fr,0.5fr,0.75fr] md:gap-x-4 lg:grid-cols-[1fr,0.3fr,0.5fr,1fr] grid-rows-[1fr, auto] mx-auto max-w-7xl p-4 xl:px-0 gap-x-2">
        <LogoDescription
          customCSS={'hidden lg:flex'}
          logoSettings={LOGO_DESC_LOGO_DATA}
          contentSettings={LOGO_DESC_DESC_DATA}
        />

        <div className=" sm:ml-6 lg:ml-0">
          <h1 className="pb-4 font-extrabold text-primary-500">Browse</h1>
          <Navigation type="footer" />
        </div>

        <div className="text-center">
          <h1 className="pb-4 font-extrabold text-primary-500">Socials</h1>
          <Socials socials={SOCIALS_DATA} />
        </div>

        <div className="text-right sm:text-left">
          <h1 className="pb-4 font-extrabold text-primary-500">Contact</h1>
          <ContactDetails contact={CONTACT_DATA} type="footer" />
        </div>

        <CompaniesHouse details={LOCATION_DETAILS} />
      </div>
    </div>
  );
}

export default Footer;
