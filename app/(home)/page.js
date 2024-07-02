import Image from 'next/image';

import landingImage from '@/public/landing-image.png';
import Button from '@components/reusable/Button';
import DodgingImage from '@components/reusable/DodgingImage';
import LandingText from '@components/non-reusable/LandingText';
import LandingBackgroundImage from '@components/non-reusable/LandingBackgroundImage';
import Carousel from '@components/reusable/Carousel';

const cards = [
  { id: 1, content: 'one' },
  { id: 2, content: 'two' },
  { id: 3, content: 'three' },
  { id: 4, content: 'four' },
  { id: 5, content: 'five' },
  { id: 6, content: 'six' },
  { id: 7, content: 'seven' },
  { id: 8, content: 'eight' },
  { id: 9, content: 'nine' },
  { id: 10, content: 'ten' },
];

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
            sizes="(min-width: 0px) 100vw, (min-width: 1024px) 50vw"
            className="object-contain object-top pointer-events-none lg:object-center"
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
      <section className="z-10 bg-slate-500">
        <Carousel carouselCards={cards} />
        {/* <Carousel
          carouselCards={cards}
          render={({ carouselRef, goToSlide, state, carouselCards }) => (
            <>
              {carouselCards.map((card) => (
                <CarouselCard key={card.id} card={card} />
              ))}
            </>
          )}
        /> */}
        {/* <Carousel carouselCards={cards}>
          {cards.map((card) => (
            <CarouselCard key={card.id} card={card} />
          ))}
        </Carousel> */}
      </section>
    </>
  );
}

export default Page;
