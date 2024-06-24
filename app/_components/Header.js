import Logo from '@components/Logo';
import Navigation from '@components/Navigation';

function Header() {
  return (
    <header className="px-8 py-5 border-b border-l-primary-900">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
