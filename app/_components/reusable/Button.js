import { validateString } from '@/app/_lib/helperShared';
import Link from 'next/link';

const buttonTypes = {
  link: 'justify-center w-3/4 p-4 text-3xl border-4 cursor-pointer min-w-40 max-w-80 rounded-2xl bg-accent-500 hover:bg-accent-200 hover:border-accent-200 hover:text-accent-500 duration-500',
  md: 'justify-center w-3/4 p-4 text-3xl border-4 cursor-pointer min-w-40 max-w-80 rounded-2xl',
  arrow: 'absolute',
  formSubmit: 'px-4 py-2 text-white bg-blue-500 rounded sm:px-6 sm:py-4',
};

function Button({ children, href, type = 'md', customCSS, onSubmit, onClick }) {
  const isTypeValidString = validateString(type, 'Type');
  const isHrefValidString = validateString(href, 'Href');

  if (!isTypeValidString || (href && !isHrefValidString))
    throw new Error('Please provide a non-empty string');

  return href ? (
    <Link href={href} className={`${buttonTypes.link} ${customCSS}`}>
      {children}
    </Link>
  ) : (
    <button
      onSubmit={onSubmit}
      onClick={onClick}
      className={`${buttonTypes[type]} ${customCSS}`}
    >
      {children}
    </button>
  );
}

export default Button;
