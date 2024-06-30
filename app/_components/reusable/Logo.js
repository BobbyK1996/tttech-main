import Image from 'next/image';
import Link from 'next/link';
import logoLarge from '@/public/logo-white.png';

function Logo() {
  return (
    <Link href="/" className="z-10">
      <Image
        src={logoLarge}
        width={160}
        // height={160}
        // layout="intrinsic"
        alt="TT Tech Logo"
        className="h-auto sm:w-48"
      />
    </Link>
  );
}

export default Logo;
