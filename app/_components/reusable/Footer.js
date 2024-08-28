'use client';

import { useNavigation } from '@/app/context/navigationContext';
import Link from 'next/link';

import {
  TiSocialLinkedinCircular,
  TiSocialInstagramCircular,
  TiSocialFacebookCircular,
  TiSocialTwitterCircular,
} from 'react-icons/ti';

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
    <div className="w-full ">
      <div className="grid w-full h-full grid-cols-[1fr,0.5fr,2fr] grid-rows-[1fr, auto] mx-auto max-w-7xl p-4 xl:px-0 gap-x-2">
        <div>
          <h1 className="pb-4 font-extrabold text-primary-500">Browse</h1>
          <div>
            <ul>
              {fullLinksArray.map((item, index) => (
                <li key={index} className="pb-1">
                  <Link href={item.address}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h1 className="pb-4 font-extrabold text-primary-500">Socials</h1>
          <div className="grid grid-cols-1 grid-rows-4 text-4xl">
            <TiSocialLinkedinCircular className="place-self-center" />
            <TiSocialInstagramCircular className="place-self-center" />
            <TiSocialTwitterCircular className="place-self-center" />
            <TiSocialFacebookCircular className="place-self-center" />
          </div>
        </div>

        <div className="text-right sm:text-left">
          <h1 className="pb-4 font-extrabold text-primary-500">Contact</h1>
          <div className="flex flex-col gap-3 break-words">
            <div>
              Winsor & Newton Building, N Building, 26 Whitefriars Ave, Harrow,
              HA3 5RN
            </div>
            <div className="">info@tttechrec.com</div>
            <div>0203 500 2721</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center col-span-4 pt-10 mx-auto text-xs text-center before:content-[''] before:border-2 before:border-transparent before:border-t-primary-500 before:w-8/12 before:min-w-10 before:-translate-y-3">
          <span>
            TT Tech Solutions LTD is a registered company in England and Wales
          </span>
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
