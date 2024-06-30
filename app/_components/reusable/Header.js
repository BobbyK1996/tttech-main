import Logo from '@/app/_components/reusable/Logo';
import Navigation from '@/app/_components/reusable/Navigation';

function Header({ border }) {
  return (
    <header
      className={`w-full px-3 py-5 ${
        border && `border-b shadow-2xl border-primary-900`
      }`}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
