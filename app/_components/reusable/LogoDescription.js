import Image from 'next/image';
import Link from 'next/link';

import { logoBase } from '@/public';

function LogoDescription({ customCSS }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${customCSS}`}>
      <div className="basis-4/12">
        <div className="relative w-20 h-20 mx-auto">
          <Link href="/">
            <Image src={logoBase} alt="TT Tech Logo" />
          </Link>
        </div>
      </div>
      <div className="basis-8/12">
        <h1 className="pb-4 font-extrabold text-primary-500">TT Tech Talent</h1>
        <p>
          A boutique recruitment company focusing on the Development, Support
          and Data industries
        </p>
      </div>
    </div>
  );
}

export default LogoDescription;
