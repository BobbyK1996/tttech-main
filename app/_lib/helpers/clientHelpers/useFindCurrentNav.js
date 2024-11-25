import { usePathname } from 'next/navigation';

function useFindCurrentNav() {
  const pathname = usePathname();
  const navigationPart = '/' + pathname.split('/')[1];
  return navigationPart;
}

export default useFindCurrentNav;
