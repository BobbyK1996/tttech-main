import {
  validateNumber,
  validateObject,
  validateString,
} from '@lib/helperShared';

function CompaniesHouse({ details, customCSS = '' }) {
  validateObject(details, 'Details');
  const {
    companyName,
    registrationLocation,
    registeredAddress,
    companyNumber,
  } = details || {};

  validateString(companyName, 'Company Name');
  validateString(registrationLocation, 'Registration Location');
  validateString(registeredAddress, 'Registered Address');
  validateNumber(companyNumber, 'Company Number');

  return (
    <div
      className={`flex flex-col items-center justify-center col-span-4 pt-10 mx-auto text-xs text-center before:content-[''] before:border-2 before:border-transparent before:border-t-primary-500 before:w-8/12 before:min-w-10 before:-translate-y-3 ${customCSS}`}
    >
      <span>
        {companyName} is a registered company in {registrationLocation}
      </span>
      <span>Company number: {companyNumber}</span>
      <span>Registered address: {registeredAddress}</span>
    </div>
  );
}

export default CompaniesHouse;
