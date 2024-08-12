import Image from 'next/image';

import bg from '@/public/landing-bg.jpg';
// import bg from '@/public/background.jpg';

import shake from '@/public/handshake.png';

function LandingBackgroundImage() {
  return (
    // <div className="absolute top-0 left-0 w-full h-full max-h-screen bg-gradient-to-b from-transparent to-space-950 to-85% flex justify-between items-end">
    <div className="absolute top-0 left-0 w-full h-full max-h-screen bg-gradient-to-b from-transparent to-space-950 to-100% flex justify-between items-end">
      <Image
        src={bg}
        alt="Space and earth against dark backdrop"
        fill
        placeholder="blur"
        quality={80}
        className="top-0 left-0 object-cover object-left w-full pointer-events-none -z-20"
      />

      <Image
        src={shake}
        fill
        className="top-0 object-cover scale-105 -translate-y-80 -rotate-6"
      />
    </div>
  );
}

export default LandingBackgroundImage;
