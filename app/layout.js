import '@/app/_styles/globals.css';

import { quattrocento, marcellus, poppins, dmsans } from '@lib/fonts';
import { NavigationProvider } from '@/app/context/navigationContext';

export const metadata = {
  title: { template: '%s: TT Tech Talent', default: 'TT Tech Talent' },
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <NavigationProvider>
        <body
          className={`${quattrocento} ${marcellus} ${poppins} ${dmsans} relative -z-10 flex min-h-screen w-full flex-col overflow-x-hidden bg-primary-950 font-quattrocento text-accent-50`}
        >
          {/* <body
          className={`${quattrocento} ${marcellus} ${poppins} relative flex flex-col min-h-screen bg-primary-950 text-accent-50 w-full font-quattrocento`}
        > */}
          {children}
        </body>
      </NavigationProvider>
    </html>
  );
}
