// import {
//   validateNumber,
//   validateObject,
//   validateString,
// } from '@helpers/indexShared';
import {
  validateNumber,
  validateObject,
  validateString,
} from '@helpers/indexShared';

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
      className={`col-span-4 mx-auto flex flex-col items-center justify-center pt-10 text-center text-xs before:w-8/12 before:min-w-10 before:-translate-y-3 before:border-2 before:border-transparent before:border-t-primary-500 before:content-[''] ${customCSS}`}
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
