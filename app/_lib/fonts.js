import { Raleway } from 'next/font/google';

const raleway_init = Raleway({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-raleway',
});

export const raleway = raleway_init.variable;
