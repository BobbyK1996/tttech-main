import '@/app/_styles/globals.css';

import Header from '@components/reusable/Header';
import Footer from '@components/reusable/Footer';

export const metadata = {
  title: { template: '%s: TT Tech Talent', default: 'TT Tech Talent' },
  description: 'Generated by create next app',
};

export default function Layout({ children }) {
  return (
    <>
      <Header border={true} />

      <div className="relative grid flex-1 px-4 py-12 sm:px-4">
        <main className="flex-1 w-full px-4 py-12 mx-auto sm:px-8 max-w-7xl">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}
