import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/logo-white.png';

function Logo() {
  return (
    <Link href="/" className="z-10">
      {/* <img src="/logo.png" /> */}
      <Image
        src={logo}
        width={320}
        height={320}
        alt="TT Tech Logo"
        className="h-auto w-80"
      />
    </Link>
  );
}

export default Logo;
