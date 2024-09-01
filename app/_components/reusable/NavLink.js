import Link from 'next/link';

function NavLink({
  name,
  address,
  isActive,
  colors,
  customCSSList,
  customCSSAnchor,
}) {
  console.log(isActive);

  return (
    <li
      className={`transition-colors, duration-300 ${colors.hoverText} ${
        colors.defaultText
      } ${isActive && colors.currentNavColor} ${customCSSList}`}
    >
      <Link href={address} className={`${customCSSAnchor}`}>
        {name}
      </Link>
    </li>
  );
}

export default NavLink;
