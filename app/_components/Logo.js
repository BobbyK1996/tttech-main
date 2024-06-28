import Image from 'next/image';
import Link from 'next/link';
import logoLarge from '@/public/logo-white.png';
import logoSmall from '@/public/logo-small.png';

function Logo() {
  return (
    <>
      <Link href="/">
        <Image
          src={logoSmall}
          width={100}
          height={100}
          alt="TT Tech Logo"
          className="w-20 h-auto"
        />
      </Link>

      <Link href="/" className="z-10 hidden">
        <Image
          src={logoLarge}
          width={160}
          height={160}
          alt="TT Tech Logo"
          className="h-auto w-44"
        />
      </Link>
    </>
  );
}

export default Logo;
