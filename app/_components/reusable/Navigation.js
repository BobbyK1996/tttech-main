'use client';

import Link from 'next/link';
import { useState } from 'react';

import { RiMenu5Fill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { useFindCurrentNav } from '@lib/helperClient';
import { useNavigation } from '@/app/context/navigationContext';

function validateLinksArray(linksArray) {
  if (!Array.isArray(linksArray) || linksArray.length === 0)
    throw new Error(
      'linksArray not present. Please include to use this component'
    );

  linksArray.forEach((link) => {
    if (
      !link.name ||
      typeof link.name !== 'string' ||
      !link.address ||
      typeof link.address !== 'string'
    ) {
      throw new Error(
        "Please provide a linksArray with valid values in the form of a string. The format for linksArray should be [{name: '', address: ''}]"
      );
    }
  });
}

function validateColors(
  colors,
  defaultBackground = '',
  hoverBackground = '',
  hoverText = '',
  defaultText = '',
  currentNavColor = ''
) {
  if (typeof colors !== 'object' || colors === null || Array.isArray(colors))
    throw new Error('Please return an object for colors');

  if (
    typeof defaultBackground !== 'string' ||
    typeof hoverBackground !== 'string' ||
    typeof hoverText !== 'string' ||
    typeof defaultText !== 'string' ||
    typeof currentNavColor !== 'string'
  )
    throw new Error(
      "All color properties must be strings in the form of 'hover:bg-' or 'bg-' or 'hover:text-' or 'text-'"
    );
}

function Navigation({ type = 'header' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => setMenuOpen(!menuOpen);

  const { navProps } = useNavigation();

  const typeValidated =
    type === 'header' || type === 'footer' ? type : 'header';

  validateLinksArray(navProps.linksArray);

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
    colorsHeader = {},
    responsiveWidth = 'w-[80%]',
  } = navProps;

  const {
    defaultBackground = 'bg-primary-800',
    hoverBackground = 'hover:bg-primary-600',
    hoverText = 'hover:text-accent-500',
    defaultText = 'text-inherit',
    currentNavColor = 'text-accent-200',
  } = colorsHeader;

  validateColors(
    colorsHeader,
    defaultBackground,
    hoverBackground,
    hoverText,
    defaultText,
    currentNavColor
  );

  const currentNav = useFindCurrentNav();

  return (
    <>
      {typeValidated === 'header' && (
        <nav className="z-10 text-xl">
          <ul className="items-center hidden gap-8 sm:flex lg:gap-12">
            {linksArray.map((item, index) => (
              <li
                key={index}
                className={`transition-colors duration-300 ${hoverText} ${defaultText} ${
                  currentNav === item.address && currentNavColor
                }`}
              >
                <Link href={item.address}>{item.name}</Link>
              </li>
            ))}
          </ul>

          <div
            onClick={handleNav}
            className="relative z-30 text-3xl cursor-pointer sm:hidden"
          >
            {menuOpen ? <IoMdClose /> : <RiMenu5Fill />}
          </div>

          <div
            className={`fixed top-0 ease-in-out duration-500 w-full h-full z-0 ${
              menuOpen
                ? 'left-0 sm:hidden backdrop-blur-gradient'
                : 'left-[-100%] p-10'
            }`}
            onClick={handleNav}
          >
            <div
              className={`h-full ${defaultBackground} w-[80%] max-w-lg z-30 absolute`}
            >
              <ul className="flex flex-col items-center justify-end w-full pt-12 pb-4">
                <li
                  className={`w-full transition-colors cursor-pointer ${hoverBackground} hover:shadow-2xl ${
                    currentNav === '/' && currentNavColor
                  }`}
                >
                  <Link
                    href={'/'}
                    className="flex justify-center w-full h-full py-4"
                  >
                    Home
                  </Link>
                </li>
                {linksArray.map((item, index) => (
                  <li
                    key={index}
                    className={`w-full transition-colors cursor-pointer ${hoverBackground} hover:shadow-2xl ${
                      currentNav === item.address && currentNavColor
                    }`}
                  >
                    <Link
                      href={item.address}
                      className="flex justify-center w-full h-full py-4"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      )}

      {typeValidated === 'footer' && (
        <nav>
          <ul>
            <li className="pb-1 duration-200 hover:text-primary-500">
              <Link href="/">Home</Link>
            </li>
            {linksArray.map((item, index) => (
              <li
                key={index}
                className="pb-1 duration-200 hover:text-primary-500"
              >
                <Link href={item.address}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;
