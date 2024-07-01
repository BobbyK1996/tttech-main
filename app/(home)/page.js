import Image from 'next/image';

import landingImage from '@/public/landing-image.png';
import Button from '@components/reusable/Button';
import DodgingImage from '@components/reusable/DodgingImage';
import LandingText from '@components/non-reusable/LandingText';
import LandingBackgroundImage from '@components/non-reusable/LandingBackgroundImage';
import Carousel from '../_components/reusable/Carousel';

const cards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

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
      <section className="z-10 p-8 bg-slate-500">
        <Carousel cards={cards} />
      </section>
    </>
  );
}

export default Page;
