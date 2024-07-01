import Image from 'next/image';

import bg from '@/public/landing-bg.jpg';
import landingImage from '@/public/landing-image.png';
import Button from '@components/reusable/Button';
import DodgingImage from '../_components/non-reusable/heroImage';

function Page() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full max-h-screen bg-gradient-to-b from-transparent to-space-950 to-85%">
        <Image
          src={bg}
          alt="Space and earth against dark backdrop"
          fill
          placeholder="blur"
          quality={80}
          className="top-0 left-0 object-cover object-left w-full -z-20"
        />
      </div>

      <section className="h-full grid grid-cols-1 grid-rows-[1.5fr,auto,1fr] gap-4 z-10">
        <h1 className="self-end order-1 mx-auto text-4xl sm:text-5xl md:text-6xl">
          Bringing <span className="text-accent-500">exceptional</span>{' '}
          companies <br /> and{' '}
          <span className="text-accent-500">exceptional</span> people, together
        </h1>

        <span className="relative order-3 row-span-2 ">
          <Image
            src={landingImage}
            fill
            className="object-contain object-top"
            alt="Astronaut"
          />
        </span>
        <Button customCSS={'flex self-start order-2 mx-auto'}>Jobs</Button>
      </section>
      <section className="h-[2000px]"></section>
    </>
  );
}

export default Page;

{
  /* <DodgingImage className="relative order-3 row-span-2">
          <Image
            src={landingImage}
            fill
            className="object-cover object-top"
            alt="Astronaut"
          />
        </DodgingImage> */
}
