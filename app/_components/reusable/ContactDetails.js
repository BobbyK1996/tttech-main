function ContactDetails({ contact }) {
  const { address, addressLink, email, phoneNumber } = contact;

  return (
    <div className="flex flex-col gap-3 break-words">
      <div className="duration-200 hover:text-primary-500">
        <a href={addressLink} target="_blank" rel="noopener noreferrer">
          {address}
        </a>
      </div>
      <div className="duration-200 hover:text-primary-500">
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <div className="duration-200 hover:text-primary-500">
        <a href={`tel:${phoneNumber}`}>phoneNumber</a>
      </div>
    </div>
  );
}

export default ContactDetails;
