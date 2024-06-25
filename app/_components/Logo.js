import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo-white.png';

function Logo() {
  return (
    <Link href="/" className="z-10">
      <Image
        src={logo}
        width={160}
        height={160}
        alt="TT Tech Logo"
        className="h-auto w-44"
      />
    </Link>
  );
}

export default Logo;
