import Link from 'next/link';

function NavLink({ name, address, isActive, colors }) {
  console.log(isActive);

  return (
    <li
      className={`transition-colors, duration-300 ${colors.hoverText} ${
        colors.defaultText
      } ${isActive && colors.currentNavColor}`}
    >
      <Link href={address}>{name}</Link>
    </li>
  );
}

export default NavLink;
