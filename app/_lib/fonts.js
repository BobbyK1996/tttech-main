import { Marcellus, Poppins, Quattrocento_Sans } from 'next/font/google';

const poppins_init = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
});

const marcellus_init = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus',
});

const quattrocento_init = Quattrocento_Sans({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-quattrocento_sans',
});

export const poppins = poppins_init.variable;

export const marcellus = marcellus_init.variable;

export const quattrocento = quattrocento_init.variable;
