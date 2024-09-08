import {
  isValidEmail,
  isValidGMapsLink,
  isValidPhoneNumber,
  validateString,
} from '@lib/helperShared';

function ContactDetails({ contact }) {
  const { address, addressLink, email, phoneNumber } = contact;

  validateString(address, 'Address', 'Please provide an address as a string');
  const addressLinkIsValid = isValidGMapsLink(addressLink);
  const emailIsValid = isValidEmail(email);
  const phoneNumberIsValid = isValidPhoneNumber(phoneNumber);

  return (
    <div className="flex flex-col gap-3 break-words">
      <div className="duration-200 hover:text-primary-500">
        {addressLinkIsValid ? (
          <a href={addressLink} target="_blank" rel="noopener noreferrer">
            {address}
          </a>
        ) : (
          <span className="text-red-500">
            Invalid address link. Please provide a Google Maps share URL.
          </span>
        )}
      </div>
      <div className="duration-200 hover:text-primary-500">
        {emailIsValid ? (
          <a href={`mailto:${email}`}>{email}</a>
        ) : (
          <span className="text-red-500">Invalid email: {email}</span>
        )}
      </div>
      <div className="duration-200 hover:text-primary-500">
        {phoneNumberIsValid ? (
          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        ) : (
          <span className="text-red-500">
            Invalid phone number. Must be in the format &apos;0XXXXXXXXXX&apos;
            or &apos;+44XXXXXXXXXX&apos;. Provided: {phoneNumber}
          </span>
        )}
      </div>
    </div>
  );
}

export default ContactDetails;
