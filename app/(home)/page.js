import Image from 'next/image';

import landingImage from '@/public/landing-image.png';
import Button from '@components/reusable/Button';
import DodgingImage from '@components/reusable/DodgingImage';
import LandingText from '@components/non-reusable/landingText';
import LandingBackgroundImage from '@components/non-reusable/LandingBackgroundImage';

function Page() {
  return (
    <>
      <LandingBackgroundImage />

      <section className="h-screen grid grid-cols-1 grid-rows-[1fr,auto,1.5fr] md:grid-rows-[1fr,auto,2fr] lg:grid-cols-2 lg:grid-rows-[1fr,1fr] lg:max-h-[1000px] lg:my-auto gap-4 z-10 md:text-xl 2xl:max-h-[1000px]">
        <LandingText />

        <DodgingImage className="relative order-3 row-span-2 lg:order-2">
          <Image
            src={landingImage}
            fill
            className="object-contain object-top lg:object-center"
            alt="Astronaut"
          />
        </DodgingImage>

        <Button
          customCSS={'flex self-start order-2 mx-auto lg:order-3'}
          href="/jobs"
        >
          Jobs
        </Button>
      </section>
      <section className="h-[2000px] bg-slate-500 z-10"></section>
    </>
  );
}

export default Page;
