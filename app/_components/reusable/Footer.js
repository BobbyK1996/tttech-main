'use client';

import { useNavigation } from '@/app/context/navigationContext';
import Image from 'next/image';
import Link from 'next/link';

import {
  TiSocialLinkedinCircular,
  TiSocialInstagramCircular,
  TiSocialFacebookCircular,
  TiSocialTwitterCircular,
} from 'react-icons/ti';

import { logoBase } from '@/public';

function Footer() {
  const { navProps } = useNavigation();

  const {
    linksArray = [
      {
        name: 'Page1',
        address: '/page1',
      },
      {
        name: 'Page2',
        address: '/page2',
      },
      {
        name: 'Page3',
        address: '/page3',
      },
    ],
  } = navProps;

  const fullLinksArray = [
    {
      name: 'Home',
      address: '#',
    },
    ...linksArray,
  ];

  return (
    <div className="w-full border-t shadow-2xl border-primary-900">
      <div className="grid w-full h-full grid-cols-[1fr,0.5fr,2fr] md:grid-cols-[0.5fr,0.5fr,2fr] md:gap-x-4 lg:grid-cols-[1fr,0.3fr,0.5fr,1fr] grid-rows-[1fr, auto] mx-auto max-w-7xl p-4 xl:px-0 gap-x-2">
        <div className="items-center justify-center hidden gap-2 lg:flex">
          <div className="basis-4/12">
            <div className="relative w-20 h-20 mx-auto">
              <Link href="/">
                <Image src={logoBase} alt="TT Tech Logo" />
              </Link>
            </div>
          </div>
          <div className="basis-8/12">
            <h1 className="pb-4 font-extrabold text-primary-500">
              TT Tech Talent
            </h1>
            <p>
              A boutique recruitment company focusing on the Development,
              Support and Data industries
            </p>
          </div>
        </div>

        <div className="pl-6">
          <h1 className="pb-4 font-extrabold text-primary-500">Browse</h1>
          <div>
            <ul>
              {fullLinksArray.map((item, index) => (
                <li
                  key={index}
                  className="pb-1 duration-200 hover:text-primary-500"
                >
                  <Link href={item.address}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h1 className="pb-4 font-extrabold text-primary-500">Socials</h1>
          <div className="grid grid-cols-1 grid-rows-4 mx-auto text-4xl md:grid-cols-2 md:grid-rows-1 md:gap-y-2 lg:grid-cols-4 max-w-48">
            <a
              href="https://www.linkedin.com/company/tttech-talent/"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-200 hover:text-primary-500"
            >
              <TiSocialLinkedinCircular className="mx-auto" />
            </a>
            <a
              href="https://www.instagram.com/tttechtalent/"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-200 hover:text-primary-500"
            >
              <TiSocialInstagramCircular className="mx-auto" />
            </a>
            <a
              href="https://twitter.com/TTTechTalent"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-200 hover:text-primary-500"
            >
              <TiSocialTwitterCircular className="mx-auto" />
            </a>
            <a
              href="https://www.facebook.com/tttechtalent/"
              target="_blank"
              rel="noopener noreferrer"
              className="duration-200 hover:text-primary-500"
            >
              <TiSocialFacebookCircular className="mx-auto" />
            </a>
          </div>
        </div>

        <div className="text-right sm:text-left">
          <h1 className="pb-4 font-extrabold text-primary-500">Contact</h1>
          <div className="flex flex-col gap-3 break-words">
            <div className="duration-200 hover:text-primary-500">
              <a
                href="https://maps.app.goo.gl/qBxCQQ5m8EjmwQdk9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Winsor & Newton Building, N Building, 26 Whitefriars Ave,
                Harrow, HA3 5RN
              </a>
            </div>
            <div className="duration-200 hover:text-primary-500">
              <a href="mailto:info@tttechrec.com">info@tttechrec.com</a>
            </div>
            <div className="duration-200 hover:text-primary-500">
              <a href="tel:+442035002721">0203 500 2721</a>
            </div>
          </div>
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