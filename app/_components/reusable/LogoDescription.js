import Image from 'next/image';
import Link from 'next/link';

import { validateLogoDescription } from '@helpers/indexServer';

function LogoDescription(props) {
  validateLogoDescription(props);

  const {
    customCSS,
    logoSettings: {
      content: logoContent = '',
      alt: logoAlt = 'Logo',
      width: logoWidth = 'w-20',
      height: logoHeight = 'h-20',
    } = {},
    contentSettings: {
      header: {
        color: headerColor = 'text-primary-500',
        content: headerContent = 'Header',
      } = {},
      body: {
        color: bodyColor = 'text-white',
        content: bodyContent = 'Body',
      } = {},
    } = {},
  } = props;

  return (
    <div className={`flex items-center justify-center gap-2 ${customCSS}`}>
      {logoContent && (
        <div className='basis-4/12'>
          <div className={`relative ${logoWidth} ${logoHeight} mx-auto`}>
            <Link href='/'>
              <Image src={logoContent} alt={logoAlt} />
            </Link>
          </div>
        </div>
      )}
      <div className='basis-8/12'>
        <h1 className={`pb-4 font-extrabold ${headerColor}`}>
          {headerContent}
        </h1>
        <p className={`${bodyColor}`}>{bodyContent}</p>
      </div>
    </div>
  );
}

export default LogoDescription;
