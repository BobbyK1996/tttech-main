'use client';

import { usePathname } from 'next/navigation';

export function useFindCurrentNav() {
  const pathname = usePathname();
  const navigationPart = '/' + pathname.split('/')[1];
  console.log(navigationPart);
  return navigationPart;
}
