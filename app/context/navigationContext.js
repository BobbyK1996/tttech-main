'use client';

import { createContext, useContext } from 'react';

const NavigationContext = createContext();

function NavigationProvider({ children }) {
  const navProps = {
    links: [
      {
        name: 'About Us',
        address: '/about',
      },
      {
        name: 'Blogs',
        address: '/blogs',
      },
      {
        name: 'Live Jobs',
        address: '/jobs',
      },
    ],
    colors: {
      defaultBackground: 'transparent',
      hoverBackground: 'hover:transparent',
      // defaultBackground: 'bg-primary-800',
      // hoverBackground: 'hover:bg-primary-600',
      hoverText: 'hover:text-accent-500',
      currentNavColor: 'text-accent-500',
    },
  };

  return (
    <NavigationContext.Provider value={{ navProps }}>
      {children}
    </NavigationContext.Provider>
  );
}

function useNavigation() {
  const context = useContext(NavigationContext);

  if (context === undefined)
    throw new Error('Context was used outside provider');

  return context;
}

export { NavigationProvider, useNavigation };
