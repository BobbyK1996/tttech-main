import Image from 'next/image';

import trishnaImage from '@/public/trishna.jpg';
import techSavvyImage from '@/public/circuit.png';
import commitmentImage from '@/public/commitment.png';
import resultsImage from '@/public/tick.png';

import trishnaMin from '@/public/trishna-min.jpg';
import bobbyMin from '@/public/bobby-min.jpg';
import farahMin from '@/public/farah-min.jpg';
import cainMin from '@/public/cain-min.jpg';
import marlennaMin from '@/public/marlenna-min.jpg';
import demMin from '@/public/dem-min.jpg';
import luluMin from '@/public/lulu-min.jpg';

import ProductsCard from '@/app/_components/reusable/ProductsCard';
import Button from '@/app/_components/reusable/Button';
import TeamCircle from '@/app/_components/reusable/TeamCircle';

const VALUES_CARDS = [
  {
    id: 1,
    parameters: {
      product: techSavvyImage,
      alt: 'Tech Savvy',
      font: 'font-dmsans',
      customTailwind: 'from-white to-white drop-shadow-2xl',
    },
    title: 'TECH SAVVY',
    content:
      'We pride ourselves on understanding the tech we work with. If we do not, how can we expect to provide a specialist service? Our consultants spend time researching the technology developers and engineers work with, so we can understand the limitations they face.',
  },
  {
    id: 2,
    parameters: {
      product: commitmentImage,
      alt: 'Commitment',
      font: 'font-dmsans',
      customTailwind: 'from-white to-white drop-shadow-2xl',
    },
    title: 'COMMITMENT',
    content:
      'Our consultants make sure you are looked after. From start to finish, we keep your experience in mind, making sure you never feel forgotten.',
  },
  {
    id: 3,
    parameters: {
      product: resultsImage,
      alt: 'Results',
      font: 'font-dmsans',
      customTailwind: 'from-white to-white drop-shadow-2xl',
      colSpanMd: 2,
      colSpanLg: 1,
    },
    title: 'RESULTS',
    content:
      'Being tech-savvy and committed means nothing if there are no results. At TT Tech Talent, we pride ourselves on our ability to deliver on our promises. Results speak for themselves, which can be seen on our testimonials page.',
  },
];
const employeeArray = [
  {
    id: 0,
    name: 'Trishna Thakrar',
    image: trishnaMin,
    role: 'CEO',
    url: 'www.google.com',
  },
  {
    id: 1,
    name: 'Bobby Kamal',
    image: bobbyMin,
    role: 'Technical Recruiter',
    url: 'www.google.com',
  },
  {
    id: 2,
    name: 'Farah Deen',
    image: farahMin,
    role: 'Support Recruiter',
    url: 'www.google.com',
  },
  {
    id: 3,
    name: 'Cain Huie',
    image: cainMin,
    role: 'Resourcer',
    url: 'www.google.com',
  },
  {
    id: 4,
    name: 'Marlenna',
    image: marlennaMin,
    role: 'Resourcer',
    url: 'www.google.com',
  },
  {
    id: 5,
    name: 'Demitrious',
    image: demMin,
    role: 'Data Recruiter',
    url: 'https://www.google.com',
  },
  {
    id: 6,
    name: 'Lulu',
    image: luluMin,
    role: 'Dog',
    url: 'https://www.google.com',
  },
];

function Page() {
  return (
    <>
      <section className="w-full p-8">
        <div className="mx-auto mt-8 max-w-7xl">
          <h1 className="mb-5 font-medium text-white text-7xl">
            Our <span className="text-accent-500">Story</span>
          </h1>

          <div className="grid w-full grid-cols-1 lg:grid-rows-[auto,1fr] gap-4 max-w-2xl ml-auto mt-20 lg:grid-cols-2 lg:max-w-4xl mb-20">
            <p className="text-3xl font-bold text-accent-500 lg:order-1">
              TT Tech Talent was founded by Trishna Thakrar and launched in
              January 2019
            </p>
            <p className="text-xl lg:order-3">
              Since our inception a short time ago, we have partnered with some
              of the most exciting and fresh technology organisations, in
              supporting them to craft highly skilled teams and source some of
              the UK and Europe&apos;s finest technology talent. Trishna has
              been recruiting within the Technology sphere for close to 10 years
              and brings to the business diverse experience and an in-depth
              knowledge of the ever-changing technology trends across some of
              the most buoyant and busiest recruitment markets. Trishna has
              worked for some of the worlds most recognized brands both
              internally and externally, including IBM and SThree. Her stint on
              the Apprentice in 2016 set her on the road to building her own
              boutique tech recruitment organisation.
            </p>
            <Image
              src={trishnaImage}
              alt="Trishna - TT Tech CEO"
              className="lg:row-span-2 lg:order-2"
            />
          </div>
        </div>
      </section>

      <section className="w-full p-8 bg-white">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-[auto,1fr] mt-8 gap-x-8 gap-y-16 max-w-7xl mx-auto text-slate-500">
          <h1 className="relative mb-5 font-medium text-7xl md:col-span-2 lg:col-span-3 md:text-8xl after:absolute after:-bottom-3 after:left-1/2 after:w-24 after:h-1 after:bg-accent-500 after:-translate-x-2/4">
            Our <span className="text-accent-500">Values</span>
          </h1>

          {VALUES_CARDS.map((card) => (
            <ProductsCard
              key={card.id}
              parameters={card.parameters}
              title={card.title}
            >
              {card.content}
            </ProductsCard>
          ))}
        </div>
      </section>

      <section className="w-full p-8 overflow-hidden">
        <div className="flex flex-col justify-between w-full mx-auto md:flex-row max-w-7xl">
          <div className="flex-1 basis-5/12">
            <h1 className="self-center mx-auto text-2xl sm:text-3xl md:text-5xl lg:pb-20">
              <span className="transition-colors duration-600 text-accent-500 hover:text-accent-200">
                More
              </span>{' '}
              than just a pretty face
            </h1>
            <h2 className="self-center mx-auto text-2xl sm:text-3xl md:text-5xl lg:pb-20">
              Meet the people behind the{' '}
              <span className="transition-colors duration-600 text-accent-500 hover:text-accent-200">
                TT Tech Experience
              </span>
            </h2>
            <Button href="#" customCSS={'flex self-center mx-auto lg:order-3'}>
              Contact Us
            </Button>
          </div>
          <TeamCircle employeeArray={employeeArray} />
        </div>
      </section>
    </>
  );
}

export default Page;
