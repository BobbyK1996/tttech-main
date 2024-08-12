import Link from 'next/link';

function Button({ children, href, customCSS, onSubmit }) {
  if (href && typeof href !== 'string')
    throw new Error('Please provide a string for href');

  return href ? (
    <Link
      href={href}
      className={`justify-center w-3/4 p-4 text-3xl border-4 cursor-pointer min-w-40 max-w-80 rounded-2xl bg-accent-500 hover:bg-accent-200 hover:border-accent-200 hover:text-accent-500 duration-500 ${customCSS}`}
    >
      {children}
    </Link>
  ) : (
    <button
      onSubmit={onSubmit}
      className={`justify-center w-3/4 p-4 text-3xl border-4 cursor-pointer min-w-40 max-w-80 rounded-2xl ${customCSS}`}
    >
      {children}
    </button>
  );
}

export default Button;
