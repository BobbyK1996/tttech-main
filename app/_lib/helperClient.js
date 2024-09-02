'use client';

import { usePathname } from 'next/navigation';

export function useFindCurrentNav() {
  const pathname = usePathname();
  const navigationPart = '/' + pathname.split('/')[1];
  return navigationPart;
}

export function validateLinksArray(linksArray) {
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

export function validateColors(colors = {}) {
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
