import Logo from '@components/reusable/Logo';
import Navigation from '@components/reusable/Navigation';

function Header({ border }) {
  return (
    <header
      className={`w-full px-3 py-5 ${
        border && `border-b border-primary-900 shadow-2xl`
      }`}
    >
      <div className='mx-auto flex max-w-7xl items-center justify-between'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
