import Image from 'next/image';

import landingImage from '@/public/landing-image.png';
import Button from '@components/reusable/Button';
import DodgingImage from '@components/reusable/DodgingImage';
import LandingText from '@components/non-reusable/LandingText';
import LandingBackgroundImage from '@components/non-reusable/LandingBackgroundImage';
import Carousel from '@components/reusable/Carousel';

const cards = [
  {
    id: 1,
    content:
      'Trishna is as good as they come. I will be forever grateful for the way she helped me to secure my dream job with in a TM1 Analyst/Developer role. Trishna instinctively seemed to understand my strengths, and where I would best fit in, she instilled a new confidence in me (after several knockbacks in the market). I can wholeheartedly recommend Trishna as an amazing recruitment consultant.',
    quoter: 'TM1 Systems Finance Analyst Travel Company',
  },
  {
    id: 2,
    content:
      'It has been a pleasure working with Trishna over the last few years. Trishna understands my recruiting requirements and comes up with the right candidates.',
    quoter: 'Director Engineering Design Comp',
  },
  {
    id: 3,
    content:
      'Bobby is truly an exceptional individual and recruiter. He has helped me every step of the way and even taken my calls at 11pm when I had doubts or concerns. He takes his time in conveying his message and is very well spoken. Importantly, he will listen to you and ensure the client fully understands your requirements. Bobby helped me to get a job at a top software company. It’s been a pleasure to have worked with him.',
    quoter: 'Senior C++/Go Engineer Open-source Software Comp',
  },
  {
    id: 4,
    content:
      'Working with Bobby was a great experience for me. He is a true professional who was always kept me updated on how things were progressing. He was very quick on replying to text messages or emails no matter what time I was sending them. I really think he can help you, and I cannot recommend him enough.',
    quoter: 'FrontEnd React Developer Computer Software Company',
  },
  {
    id: 5,
    content:
      'You have taken a lot of stress off my shoulders, working side by side. The candidates you have sourced so far have been of a good caliber and you understood the job spec really well, while not having full details to pass on in the first conversation. You have responded during your evenings and weekends and you have been a great support so far. Thank you.',
    quoter: 'Talent Acquisition Partner CCTV Technology Company',
  },
  {
    id: 6,
    content:
      'I found Farah to be incredibly informative, professional and attentive to details in my dealings with her with a great understanding of the tech industry. It was a pleasure working with her.',
    quoter: 'Tech Support Consultant Retailer',
  },
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
      <section className="z-10 ">
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
