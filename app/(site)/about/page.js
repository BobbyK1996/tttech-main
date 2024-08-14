import trishnaImage from '@/public/trishna.jpg';
import Image from 'next/image';

function Page() {
  return (
    <div>
      <h1 className="mb-5 font-medium text-white text-7xl">
        Our <span className="text-accent-500">Story</span>
      </h1>

      <div className="grid w-full grid-cols-1 lg:grid-rows-[auto,1fr] gap-4 max-w-2xl ml-auto mt-20 lg:grid-cols-2 lg:max-w-4xl">
        <p className="text-3xl font-bold text-accent-500 lg:order-1">
          TT Tech Talent was founded by Trishna Thakrar and launched in January
          2019
        </p>
        <p className="text-xl lg:order-3">
          Since our inception a short time ago, we have partnered with some of
          the most exciting and fresh technology organisations, in supporting
          them to craft highly skilled teams and source some of the UK and
          Europe&apos;s finest technology talent. Trishna has been recruiting
          within the Technology sphere for close to 10 years and brings to the
          business diverse experience and an in-depth knowledge of the
          ever-changing technology trends across some of the most buoyant and
          busiest recruitment markets. Trishna has worked for some of the worlds
          most recognized brands both internally and externally, including IBM
          and SThree. Her stint on the Apprentice in 2016 set her on the road to
          building her own boutique tech recruitment organisation.
        </p>
        <Image
          src={trishnaImage}
          alt="Trishna - TT Tech CEO"
          className="lg:row-span-2 lg:order-2"
        />
      </div>
    </div>
  );
}

export default Page;
