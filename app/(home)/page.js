import Image from 'next/image';
import bg from '@/public/landing-bg.jpg';

function Page() {
  return (
    <>
      <Image
        src={bg}
        alt="Space and earth against dark backdrop"
        fill
        className="left-0 object-cover object-left max-h-screen"
      />
      <section className="h-full"></section>
    </>
  );
}

export default Page;
