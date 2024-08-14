import Image from 'next/image';
import { RiH2 } from 'react-icons/ri';

const cardType = {
  gradientDirection: {
    toTop: 'bg-gradient-to-t',
    toTopRight: 'bg-gradient-to-tr',
    toRight: 'bg-gradient-to-r',
    toBotRight: 'bg-gradient-to-br',
    toBot: 'bg-gradient-to-b',
    toBotLeft: 'bg-gradient-to-bl',
    toLeft: 'bg-gradient-to-tl',
    toTopLeft: 'bg-gradient-to-tl',
  },
  gradientDirectionMd: {
    toTop: 'md:bg-gradient-to-t',
    toTopRight: 'md:bg-gradient-to-tr',
    toRight: 'md:bg-gradient-to-r',
    toBotRight: 'md:bg-gradient-to-br',
    toBot: 'md:bg-gradient-to-b',
    toBotLeft: 'md:bg-gradient-to-bl',
    toLeft: 'md:bg-gradient-to-tl',
    toTopLeft: 'md:bg-gradient-to-tl',
  },
  gradientDirectionLg: {
    toTop: 'lg:bg-gradient-to-t',
    toTopRight: 'lg:bg-gradient-to-tr',
    toRight: 'lg:bg-gradient-to-r',
    toBotRight: 'lg:bg-gradient-to-br',
    toBot: 'lg:bg-gradient-to-b',
    toBotLeft: 'lg:bg-gradient-to-bl',
    toLeft: 'lg:bg-gradient-to-tl',
    toTopLeft: 'lg:bg-gradient-to-tl',
  },
  colSpan: {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
  },
  colSpanMd: {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
  },
  colSpanLg: {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
  },
};

function validateParam(param, filter) {
  if (param && typeof param !== filter)
    throw new Error(
      'Please make sure all values of the parameters object are strings or numbers, or an image for "parameters"'
    );
}

function ProductsCard({
  parameters: {
    product,
    alt = 'Product Image',
    gradientDirection,
    gradientDirectionMd,
    gradientDirectionLg,
    colSpan,
    colSpanMd,
    colSpanLg,
    customTailwind,
    font,
  } = {},
  title = null,
  children,
}) {
  validateParam(alt, 'string');

  validateParam(gradientDirection, 'string');
  validateParam(gradientDirectionMd, 'string');
  validateParam(gradientDirectionLg, 'string');

  validateParam(colSpan, 'number');
  validateParam(colSpanMd, 'number');
  validateParam(colSpanLg, 'number');

  validateParam(customTailwind, 'string');
  validateParam(font, 'string');

  return (
    <div
      className={`flex flex-col gap-6 p-6 ${
        gradientDirection
          ? cardType.gradientDirection[gradientDirection]
          : cardType.gradientDirection.toTop
      } ${
        gradientDirectionMd && cardType.gradientDirectionMd[gradientDirectionMd]
      } ${
        gradientDirectionLg && cardType.gradientDirectionLg[gradientDirectionLg]
      }
      ${colSpan ? cardType.colSpan[colSpan] : cardType.colSpan[1]} ${
        colSpanMd && cardType.colSpanMd[colSpanMd]
      } ${
        colSpanLg && cardType.colSpanLg[colSpanLg]
      } from-primary-950 from-40% to-primary-900 to-100% shadow-2xl rounded-md max-w-sm mx-auto min-w-64 
      ${font && font}
      ${customTailwind && customTailwind}`}
    >
      <Image src={product} alt={alt} className={``} />
      {title !== null && <h2 className="text-2xl font-bold">{title}</h2>}
      <p className={`text-lg ${font && font}`}>{children}</p>
    </div>
  );
}

export default ProductsCard;
