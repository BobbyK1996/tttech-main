import Logo from '@components/Logo';
import Navigation from '@components/Navigation';

const navProps = {
  linksArray: [
    {
      name: 'About Us',
      address: '/about',
    },
    {
      name: 'Blogs',
      address: '/blogs',
    },
    {
      name: 'Live Jobs',
      address: '/jobs',
    },
  ],
  colors: {
    defaultBackground: 'bg-primary-800',
    hoverBackground: 'hover:bg-primary-600',
    hoverText: 'hover:text-accent-500',
    currentNavColor: 'text-accent-200',
  },
};

function Header() {
  return (
    <header className="w-full px-3 py-5 border-b shadow-2xl border-primary-900">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Logo />
        <Navigation navProps={navProps} />
      </div>
    </header>
  );
}

export default Header;
