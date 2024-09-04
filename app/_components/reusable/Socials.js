import { validateSocials } from '@lib/helperClient';

function Socials({ socials }) {
  validateSocials(socials);

  return (
    <div className="grid grid-cols-1 grid-rows-4 mx-auto text-4xl md:grid-cols-2 md:grid-rows-1 md:gap-y-2 lg:grid-cols-4 max-w-48">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target={social.newTab ? '_blank' : null}
          rel={social.newTab ? 'noopener noreferrer' : null}
          className="duration-200 hover:text-primary-500 [&>*]:mx-auto"
        >
          {social.logo}
        </a>
      ))}
    </div>
  );
}

export default Socials;
