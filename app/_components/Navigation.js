'use client';

import Link from 'next/link';
import { useState } from 'react';

import { RiMenu5Fill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => setMenuOpen(!menuOpen);

  return (
    <nav className="z-10 text-xl">
      <ul className="items-center hidden gap-8 sm:flex lg:gap-12">
        {linksArray.map((item, index) => (
          <li
            key={index}
            className="transition-colors duration-300 hover:text-accent-500"
          >
            <Link href={item.address}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={handleNav}
        className="relative z-30 text-3xl cursor-pointer sm:hidden"
      >
        {menuOpen ? <IoMdClose /> : <RiMenu5Fill />}
      </div>

      <div
        className={`fixed top-0 ease-in-out duration-500 w-full h-full z-0 ${
          menuOpen
            ? 'left-0 sm:hidden backdrop-blur-gradient'
            : 'left-[-100%] p-10'
        }`}
        onClick={handleNav}
      >
        <div className="h-full bg-primary-800 w-[80%] max-w-lg z-30 absolute">
          <ul className="flex flex-col items-center justify-end w-full pt-12 pb-4">
            <li className="flex justify-center w-full py-4 transition-colors cursor-pointer hover:bg-primary-600 hover:shadow-2xl">
              <Link href={'/'}>Home</Link>
            </li>
            {linksArray.map((item, index) => (
              <li
                key={index}
                className="flex justify-center w-full py-4 transition-colors cursor-pointer hover:bg-primary-600 hover:shadow-2xl"
              >
                <Link href={item.address}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
