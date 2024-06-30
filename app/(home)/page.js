import Image from 'next/image';

import bg from '@/public/landing-bg.jpg';
import landingImage from '@/public/landing-image.png';
import Button from '@components/reusable/Button';

function Page() {
  return (
    <>
      <Image
        src={bg}
        alt="Space and earth against dark backdrop"
        fill
        className="left-0 object-cover object-left max-h-screen -z-10"
      />
      <section
        className={`h-full grid grid-cols-1 grid-rows-[1.5fr,auto,1fr] gap-4`}
      >
        <h1 className="self-end order-1 mx-auto text-4xl sm:text-5xl md:text-6xl">
          Bringing <span className="text-accent-500">exceptional</span>{' '}
          companies <br /> and{' '}
          <span className="text-accent-500">exceptional</span> people, together
        </h1>
        <span className="relative order-3 row-span-2 ">
          <Image
            src={landingImage}
            fill
            className="object-cover object-top"
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
