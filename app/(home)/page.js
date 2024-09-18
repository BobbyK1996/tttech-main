// import DodgingImage from '@components/reusable/DodgingImage';
import LandingText from '@components/non-reusable/LandingText';
import LandingBackgroundImage from '@components/non-reusable/LandingBackgroundImage';

import Button from '@components/reusable/Button';
import Carousel from '@components/reusable/Carousel';
import ProductsCard from '@components/reusable/ProductsCard';
import ContactDetails from '@components/reusable/ContactDetails';
import ContactForm from '@components/reusable/ContactForm';
// import landingImage from '@/public/landing-image.png';

import {
  CONTACT_DATA,
  REVIEW_DATA as CAROUSEL_CARDS,
  PRODUCT_CARDS,
} from '@lib/data';

function Page() {
  return (
    <>
      <LandingBackgroundImage />

      {/* <section className="h-screen grid grid-cols-1 grid-rows-[1fr,auto,1.5fr] md:grid-rows-[1fr,auto,2fr] lg:grid-cols-2 lg:grid-rows-[1fr,1fr] lg:max-h-[1000px] lg:my-auto gap-4 z-10 md:text-xl 2xl:max-h-[1000px]"> */}
      <section className="h-screen grid grid-cols-1 lg:grid-cols-2 lg:max-h-[1000px] lg:my-auto gap-4 z-10 md:text-xl 2xl:max-h-[1000px]">
        <LandingText />

        {/* <DodgingImage className="relative order-3 row-span-2 lg:order-2">
          <Image
            src={landingImage}
            fill
            sizes="(min-width: 0px) 100vw, (min-width: 1024px) 50vw"
            className="object-contain object-top pointer-events-none lg:object-center"
            alt="Astronaut"
          />
        </DodgingImage> */}

        <Button
          customCSS={'flex self-center mx-auto lg:order-3 translate-y-32'}
          href="/jobs"
        >
          Jobs
        </Button>
      </section>

      <section className="z-10">
        <Carousel carouselCards={CAROUSEL_CARDS} />
      </section>

      <section className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-[auto,1fr] gap-x-8 gap-y-16">
        <h1 className="relative mx-auto text-center text-7xl md:col-span-2 lg:col-span-3 md:text-8xl after:absolute after:-bottom-3 after:left-1/2 after:w-24 after:h-1 after:bg-accent-500 after:-translate-x-2/4">
          What We Offer
        </h1>

        {PRODUCT_CARDS.map((card) => (
          <ProductsCard
            key={card.id}
            parameters={card.parameters}
            title={card.title}
          >
            {card.content}
          </ProductsCard>
        ))}
      </section>

      <section className="flex flex-col gap-6 font-dmsans md:flex-row md:items-center">
        <div className="flex flex-col max-w-md gap-16 lg:max-w-xl">
          <div>
            <h1 className="text-5xl lg:text-6xl">Talk to a consultant</h1>
            <p className="mt-6 text-xl">
              Submit the form and a member of our team will get back to you
            </p>
          </div>
          <ContactDetails contact={CONTACT_DATA} />
        </div>
        <div className="flex-grow max-w-md sm:ml-2 md:ml-auto">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

export default Page;
