'use client';

import { usePathname } from 'next/navigation';

export function findCurrentNav() {
  const pathname = usePathname();
  const navigationPart = '/' + pathname.split('/')[1];

  return navigationPart;
}
