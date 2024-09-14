import {
  isValidEmail,
  isValidGMapsLink,
  isValidPhoneNumber,
  validateString,
} from '@lib/helperShared';

import { IoPhonePortrait, IoMail, IoLocationSharp } from 'react-icons/io5';

const containerClassMain =
  'flex duration-200 text-start hover:text-primary-500 gap-x-2';
const iconClassMain = 'w-auto text-5xl text-primary-500 grow-0 shrink-0';
const anchorClassMain = 'flex items-center text-2xl';
const errorClass = 'text-red-500';

function ContactDetails({
  contact: { address, addressLink, email, phoneNumber },
  type,
}) {
  const isFooter = type === 'footer';

  validateString(address, 'Address', 'Please provide an address as a string');
  const addressLinkIsValid = isValidGMapsLink(addressLink);
  const emailIsValid = isValidEmail(email);
  const phoneNumberIsValid = isValidPhoneNumber(phoneNumber);

  return (
    <div className="flex flex-col gap-3 break-words">
      {!isFooter && (
        <>
          <div className={containerClassMain}>
            <IoPhonePortrait className={iconClassMain} />
            {phoneNumberIsValid ? (
              <a href={`tel:${phoneNumber}`} className={anchorClassMain}>
                {phoneNumber}
              </a>
            ) : (
              <span className={errorClass}>
                Invalid phone number. Must be in the format
                &apos;0XXXXXXXXXX&apos; or &apos;+44XXXXXXXXXX&apos;. Provided:{' '}
                {phoneNumber}
              </span>
            )}
          </div>

          <div className={containerClassMain}>
            <IoMail className={iconClassMain} />
            {emailIsValid ? (
              <a href={`mailto:${email}`} className={anchorClassMain}>
                {email}
              </a>
            ) : (
              <span className={errorClass}>Invalid email: {email}</span>
            )}
          </div>

          <div className={containerClassMain}>
            <IoLocationSharp className={iconClassMain} />
            {addressLinkIsValid ? (
              <a
                href={addressLink}
                target="_blank"
                rel="noopener noreferrer"
                className={anchorClassMain}
              >
                {address}
              </a>
            ) : (
              <span className={errorClass}>
                Invalid address link. Please provide a Google Maps share URL.
              </span>
            )}
          </div>
        </>
      )}

      {isFooter && (
        <>
          <div className="duration-200 hover:text-primary-500">
            {addressLinkIsValid ? (
              <a href={addressLink} target="_blank" rel="noopener noreferrer">
                {address}
              </a>
            ) : (
              <span className={errorClass}>
                Invalid address link. Please provide a Google Maps share URL.
              </span>
            )}
          </div>
          <div className="duration-200 hover:text-primary-500">
            {emailIsValid ? (
              <a href={`mailto:${email}`}>{email}</a>
            ) : (
              <span className={errorClass}>Invalid email: {email}</span>
            )}
          </div>
          <div className="duration-200 hover:text-primary-500">
            {phoneNumberIsValid ? (
              <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            ) : (
              <span className={errorClass}>
                Invalid phone number. Must be in the format
                &apos;0XXXXXXXXXX&apos; or &apos;+44XXXXXXXXXX&apos;. Provided:{' '}
                {phoneNumber}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ContactDetails;
