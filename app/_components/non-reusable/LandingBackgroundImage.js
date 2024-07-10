import Image from 'next/image';

import bg from '@/public/landing-bg.jpg';
import DodgingSvg from '../reusable/DodgingSvg';

function LandingBackgroundImage({ dodge = false }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full max-h-screen bg-gradient-to-b from-transparent to-space-950 to-85%">
      <Image
        src={bg}
        alt="Space and earth against dark backdrop"
        fill
        placeholder="blur"
        quality={80}
        className="top-0 left-0 object-cover object-left w-full pointer-events-none -z-20"
      />

      {dodge && <DodgingSvg />}
    </div>
  );
}

export default LandingBackgroundImage;
