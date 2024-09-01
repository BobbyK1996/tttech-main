'use client';

import Link from 'next/link';
import { useState } from 'react';

import { RiMenu5Fill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { useFindCurrentNav } from '@lib/helperClient';
import { useNavigation } from '@/app/context/navigationContext';

import NavLink from '@components/reusable/NavLink';

function validateLinksArray(linksArray) {
  if (!Array.isArray(linksArray) || linksArray.length === 0)
    throw new Error(
      'linksArray not present. Please include to use this component'
    );

  linksArray.forEach(({ name, address }) => {
    if (typeof name !== 'string' || typeof address !== 'string') {
      throw new Error(
        "Please provide a linksArray with valid values in the form of a string. The format for linksArray should be [{name: '', address: ''}]"
      );
    }
  });
}

function validateColors(colors = {}) {
  if (typeof colors !== 'object' || colors === null || Array.isArray(colors))
    throw new Error('Please return an object for colors');

  const {
    defaultBackground,
    hoverBackground,
    hoverText,
    defaultText,
    currentNavColor,
  } = colors;

  if (
    ![
      defaultBackground,
      hoverBackground,
      hoverText,
      defaultText,
      currentNavColor,
    ].every((color) => typeof color === 'string')
  ) {
    throw new Error(
      "All color properties must be strings in the form of 'hover:bg-' or 'bg-' or 'hover:text-' or 'text-'"
    );
  }
}

function Navigation({ type = 'header' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { navProps } = useNavigation();
  const currentNav = useFindCurrentNav();

  console.log(currentNav);

  const { links = [], colors = {}, responsiveWidth = 'w-[80%]' } = navProps;
  const {
    defaultBackground = 'bg-primary-800',
    hoverBackground = 'hover:bg-primary-600',
    hoverText = 'hover:text-accent-500',
    defaultText = 'text-inherit',
    currentNavColor = 'text-accent-200',
  } = colors;

  validateLinksArray(links);
  validateColors({
    defaultBackground,
    hoverBackground,
    hoverText,
    defaultText,
    currentNavColor,
  });

  const isFooter = type === 'footer';

  return (
    <>
      <nav
        className={`z-10 ${
          !isFooter ? 'text-xl header-class' : 'footer-class'
        }`}
      >
        {!isFooter && (
          <>
            <ul className="items-center hidden gap-8 sm:flex lg:gap-12">
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  name={link.name}
                  address={link.address}
                  isActive={currentNav === link.address}
                  colors={{ hoverText, defaultText, currentNavColor }}
                />
              ))}
            </ul>

            <div
              onClick={() => setMenuOpen(!menuOpen)}
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
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div
                className={`h-full ${defaultBackground} w-[80%] max-w-lg z-30 absolute`}
              >
                <ul className="flex flex-col items-center justify-end w-full pt-12 pb-4">
                  <NavLink
                    name="Home"
                    address="/"
                    colors={{ hoverText }}
                    customCSSList={`w-full transition-colors cursor-pointer ${hoverBackground} hover:shadow-2xl ${
                      currentNav === '/' && currentNavColor
                    }`}
                    customCSSAnchor={'flex justify-center w-full h-full py-4'}
                  />

                  {links.map((link, index) => (
                    <NavLink
                      key={index}
                      name={link.name}
                      address={link.address}
                      colors={{ hoverText }}
                      customCSSList={`w-full transition-colors cursor-pointer ${hoverBackground} hover:shadow-2xl ${
                        currentNav === link.address && currentNavColor
                      }`}
                      customCSSAnchor={'flex justify-center w-full h-full py-4'}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {isFooter && (
          <ul>
            <NavLink name="Home" address="/" colors={{ hoverText }} />
            {links.map((link, index) => (
              <NavLink
                key={index}
                name={link.name}
                address={link.address}
                colors={{ hoverText }}
                customCSS="pb-1"
              />
            ))}
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navigation;
