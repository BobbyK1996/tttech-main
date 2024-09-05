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

  if (
    logoContent &&
    typeof logoContent !== 'string' &&
    !(typeof logoContent === 'object' && typeof logoContent.src === 'string')
  ) {
    throw new Error(
      'logoSettings.content must be a string (URL) or an object with a `src` property representing the logo URL.'
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

  if (typeof contentSettings !== 'object' || contentSettings === null) {
    throw new Error(
      'contentSettings must be an object with possible keys of header and body. Each of these keys also have possible keys of color and content'
    );
  }

  const { header = {}, body = {} } = contentSettings;

  if (typeof header !== 'object' || header === null) {
    throw new Error(
      'contentSettings.header must be an object with possible keys of color and content.'
    );
  }

  const { color: headerColor, content: headerContent } = header;

  if (headerColor && typeof headerColor !== 'string') {
    throw new Error(
      'contentSettings.header.color must be a string representing a TailwindCSS color class.'
    );
  }

  if (headerContent && typeof headerContent !== 'string') {
    throw new Error(
      'contentSettings.header.content must be a string representing the header content.'
    );
  }

  if (typeof body !== 'object' || body === null) {
    throw new Error(
      'contentSettings.body must be an object with possible keys of color and content.'
    );
  }

  const { color: bodyColor, content: bodyContent } = body;

  if (bodyColor && typeof bodyColor !== 'string') {
    throw new Error(
      'contentSettings.body.color must be a string representing a TailwindCSS color class.'
    );
  }

  if (bodyContent && typeof bodyContent !== 'string') {
    throw new Error(
      'contentSettings.body.content must be a string representing the body content.'
    );
  }
}

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
