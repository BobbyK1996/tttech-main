import Link from 'next/link';

const linksArray = [
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
];

function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        {linksArray.map((item) => (
          <li>
            <Link
              href={item.address}
              className="transition-colors hover:text-accent-400"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
