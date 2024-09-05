import Image from 'next/image';
import Link from 'next/link';

function validateLogoDescription({
  customCSS = '',
  logoSettings = {},
  contentSettings = {},
} = {}) {
  if (typeof customCSS !== 'string') {
    throw new Error('customCSS must be a string containing TailwindCSS.');
  }

  if (typeof logoSettings !== 'object' || logoSettings === null) {
    throw new Error(
      'logoSettings must be an object with possible keys of content, alt, width and height.'
    );
  }

  const {
    content: logoContent,
    alt: logoAlt,
    width: logoWidth,
    height: logoHeight,
  } = logoSettings;

  if (logoContent && typeof logoContent !== 'string') {
    throw new Error(
      'logoSettings.content must be a string representing the logo URL.'
    );
  }

  if (logoAlt && typeof logoAlt !== 'string') {
    throw new Error('logoSettings.alt must be a string describing the logo.');
  }

  if (logoWidth && typeof logoWidth !== 'string') {
    throw new Error(
      'logoSettings.width must be a valid TailwindCSS class that represents a width.'
    );
  }

  if (logoHeight && typeof logoHeight !== 'string') {
    throw new Error(
      'logoSettings.height must be a valid TailwindCSS class that represents a height.'
    );
  }
}

function LogoDescription({
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
}) {
  return (
    <div className={`flex items-center justify-center gap-2 ${customCSS}`}>
      {logoContent && (
        <div className="basis-4/12">
          <div className={`relative ${logoWidth} ${logoHeight} mx-auto`}>
            <Link href="/">
              <Image src={logoContent} alt={logoAlt} />
            </Link>
          </div>
        </div>
      )}
      <div className="basis-8/12">
        <h1 className={`pb-4 font-extrabold ${headerColor}`}>
          {headerContent}
        </h1>
        <p className={`${bodyColor}`}>{bodyContent}</p>
      </div>
    </div>
  );
}

export default LogoDescription;
