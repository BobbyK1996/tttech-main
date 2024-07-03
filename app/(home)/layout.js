import '@/app/_styles/globals.css';
import { marcellus, quattrocento, raleway } from '@lib/fonts';

import Header from '@/app/_components/reusable/Header';

export const metadata = {
  title: { template: '%s: TT Tech Talent', default: 'TT Tech Talent' },
  description: 'Generated by create next app',
};

export default function Layout({ children }) {
  return (
    <>
      <Header border={false} />

      {/* <div className="absolute flex-1 w-full h-full"> */}
      {/* <div className="flex-1 w-full bg-gradient-to-b from-space-950 from-mh to-primary-950 to-50% -z-20"> */}
      <div className="flex-1 w-full bg-gradient-to-b from-space-950 from-mh to-primary-950 -z-30">
        <main className="flex flex-col flex-1 w-full h-full px-4 py-4 mx-auto sm:px-8 sm:pt-10 max-w-7xl font-marcellus">
          {children}
        </main>
      </div>
    </>
  );
}
