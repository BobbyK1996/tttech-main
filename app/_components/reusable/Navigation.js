'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import {
  useFindCurrentNav,
  validateLinksArray,
  validateColors,
} from '@helpers/indexClient';
import { useNavigation } from '@/app/context/navigationContext';

import { RiMenu5Fill } from 'react-icons/ri';
const IoMdClose = dynamic(
  () => import('react-icons/io').then((mod) => mod.IoMdClose),
  { ssr: false },
);

import NavLink from '@components/reusable/NavLink';

const defaultNavProps = {
  links: [],
  colors: {
    defaultBackground: 'bg-primary-800',
    hoverBackground: 'hover:bg-primary-600',
    hoverText: 'hover:text-accent-500',
    defaultText: 'text-inherit',
    currentNavColor: 'text-accent-200',
  },
  responsiveWidth: 'w-[80%]',
};

function Navigation({ type }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { navProps = defaultNavProps } = useNavigation();
  const currentNav = useFindCurrentNav();

  const { links, colors, responsiveWidth } = useMemo(() => {
    const { links = [], colors = {}, responsiveWidth = 'w-[80%]' } = navProps;
    const validatedColors = {
      defaultBackground: colors.defaultBackground || 'bg-primary-800',
      hoverBackground: colors.hoverBackground || 'hover:bg-primary-600',
      hoverText: colors.hoverText || 'hover:text-accent-500',
      hoverTextFooter: colors.hoverTextFooter || 'hover:text-primary-500',
      defaultText: colors.defaultText || 'text-inherit',
      currentNavColor: colors.currentNavColor || 'text-accent-200',
      currentNavColorFooter: colors.currentNavColorFooter || 'text-primary-500',
    };
    validateLinksArray(links);
    validateColors(validatedColors);
    return { links, colors: validatedColors, responsiveWidth };
  }, [navProps]);

  const {
    defaultBackground,
    hoverBackground,
    hoverText,
    defaultText,
    currentNavColor,
    hoverTextFooter,
    currentNavColorFooter,
  } = colors;

  const isFooter = type === 'footer';

  const menuClass = `fixed top-0 ease-in-out duration-500 w-full h-full z-0 ${
    menuOpen ? 'left-0 sm:hidden backdrop-blur-gradient' : 'left-[-100%] p-10'
  }`;

  const mobileListItemClass = `w-full transition-colors cursor-pointer ${hoverBackground} hover:shadow-2xl`;

  return (
    <>
      <nav
        className={`z-10 ${
          !isFooter ? 'header-class text-xl' : 'footer-class'
        }`}
      >
        {!isFooter && (
          <>
            <ul className='hidden items-center gap-8 sm:flex lg:gap-12'>
              {links.map((link, index) => {
                return (
                  <NavLink
                    key={index}
                    name={link.name}
                    address={link.address}
                    isActive={currentNav === link.address}
                    colors={{ hoverText, currentNavColor }}
                  />
                );
              })}
            </ul>

            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className='relative z-30 cursor-pointer text-3xl sm:hidden'
            >
              {menuOpen ? <IoMdClose /> : <RiMenu5Fill />}
            </div>

            <div className={menuClass} onClick={() => setMenuOpen(!menuOpen)}>
              <div
                className={`h-full ${defaultBackground} ${responsiveWidth} absolute z-30 max-w-lg`}
              >
                <ul className='flex w-full flex-col items-center justify-end pb-4 pt-12'>
                  <NavLink
                    name='Home'
                    address='/'
                    colors={{ hoverText, currentNavColor }}
                    isActive={currentNav === '/'}
                    customCSSList={`${mobileListItemClass} ${
                      currentNav === '/' && currentNavColor
                    }`}
                    customCSSAnchor={'flex justify-center w-full h-full py-4'}
                  />

                  {links.map((link, index) => (
                    <NavLink
                      key={index}
                      name={link.name}
                      address={link.address}
                      isActive={currentNav === link.address}
                      colors={{ hoverText, currentNavColor }}
                      customCSSList={`${mobileListItemClass} ${
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
            <NavLink
              name='Home'
              address='/'
              isActive={currentNav === '/'}
              colors={{ hoverTextFooter, currentNavColorFooter }}
            />
            {links.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  name={link.name}
                  address={link.address}
                  isActive={currentNav === link.address}
                  colors={{ hoverTextFooter, currentNavColorFooter }}
                  customCSS='pb-1'
                />
              );
            })}
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navigation;
