import {
  IoPersonCircleSharp,
  IoPhonePortrait,
  IoMail,
  IoBriefcase,
  IoLogoLinkedin,
  IoLinkSharp,
  IoReader,
  IoCheckmarkCircle,
  IoCloseCircle,
} from 'react-icons/io5';

import {
  isValidEmail,
  isValidJobTitle,
  isValidMessage,
  isValidName,
  isValidPhoneNumber,
  isValidUrl,
  returnTrimmed,
  validateObject,
} from '@lib/helperShared';

const reviewItemStyles = 'text-xl self-start mt-0.5';

function SubmitFormReview({ formData }) {
  const formDataTrimmed = returnTrimmed(formData);
  const isValidObject = validateObject(formDataTrimmed, 'formatData');

  if (!isValidObject)
    console.error(
      'formData is not a valid object. Please check your implementation of useSubmitForm',
    );

  return (
    <div className='text-white'>
      <h1 className='mb-2 text-2xl font-bold text-accent-500 underline'>
        Required
      </h1>
      <div className='grid grid-cols-[0.15fr,0.25fr,2.5fr,0.5fr] gap-x-2 gap-y-4 sm:gap-x-4 lg:grid-cols-[0.1fr,0.25fr,2.5fr,0.5fr]'>
        <div
          className={`${reviewItemStyles} ${isValidName(formDataTrimmed.givenName) && isValidName(formDataTrimmed.surname) ? 'text-primary-500' : 'text-red-500'}`}
        >
          <IoPersonCircleSharp />
        </div>
        <div
          className={`${isValidName(formDataTrimmed.givenName) && isValidName(formDataTrimmed.surname) ? 'text-primary-500' : 'text-red-500'}`}
        >
          Name:
        </div>
        <div>
          {formDataTrimmed.givenName && formDataTrimmed.surname
            ? `${formDataTrimmed.givenName} ${formDataTrimmed.surname}`
            : '-'}
        </div>
        <div className={reviewItemStyles}>
          {isValidName(formDataTrimmed.givenName) &&
          isValidName(formDataTrimmed.surname) ? (
            <IoCheckmarkCircle className='text-primary-500' />
          ) : (
            <IoCloseCircle className='text-red-500' />
          )}
        </div>
        <div
          className={`${reviewItemStyles} ${isValidPhoneNumber(formDataTrimmed.number) ? 'text-primary-500' : 'text-red-500'}`}
        >
          <IoPhonePortrait />
        </div>
        <div
          className={`${isValidPhoneNumber(formDataTrimmed.number) ? 'text-primary-500' : 'text-red-500'}`}
        >
          Number:
        </div>
        <div>{formDataTrimmed.number ? `${formDataTrimmed.number}` : '-'}</div>
        <div className={reviewItemStyles}>
          {isValidPhoneNumber(formDataTrimmed.number) ? (
            <IoCheckmarkCircle className='text-primary-500' />
          ) : (
            <IoCloseCircle className='text-red-500' />
          )}
        </div>

        <div
          className={`${reviewItemStyles} ${isValidEmail(formDataTrimmed.email) ? 'text-primary-500' : 'text-red-500'}`}
        >
          <IoMail />
        </div>
        <div
          className={`${isValidEmail(formDataTrimmed.email) ? 'text-primary-500' : 'text-red-500'}`}
        >
          Email:
        </div>
        <div>{formDataTrimmed.email ? `${formDataTrimmed.email}` : '-'}</div>
        <div className={reviewItemStyles}>
          {isValidEmail(formDataTrimmed.email) ? (
            <IoCheckmarkCircle className='text-primary-500' />
          ) : (
            <IoCloseCircle className='text-red-500' />
          )}
        </div>
      </div>

      <h1 className='mb-2 mt-6 text-2xl font-bold text-accent-500 underline'>
        Optional
      </h1>
      <div className='grid grid-cols-[0.15fr,0.25fr,2.5fr,0.5fr] gap-x-2 gap-y-4 sm:gap-x-4 lg:grid-cols-[0.1fr,0.25fr,2.5fr,0.5fr]'>
        <div
          className={`${reviewItemStyles} ${isValidJobTitle(formDataTrimmed.currentJobTitle) ? 'text-primary-500' : 'text-red-500'}`}
        >
          <IoBriefcase />
        </div>
        <div
          className={`${isValidJobTitle(formDataTrimmed.currentJobTitle) ? 'text-primary-500' : 'text-red-500'}`}
        >
          Current Job Title:
        </div>
        <div>
          {formDataTrimmed.currentJobTitle
            ? `${formDataTrimmed.currentJobTitle}`
            : '-'}
        </div>
        <div className={reviewItemStyles}>
          {isValidJobTitle(formDataTrimmed.currentJobTitle) ? (
            <IoCheckmarkCircle className='text-primary-500' />
          ) : (
            <IoCloseCircle className='text-red-500' />
          )}
        </div>

        <div
          className={`${reviewItemStyles} ${isValidUrl(formDataTrimmed.linkedinLink, true) ? 'text-primary-500' : 'text-red-500'}`}
        >
          <IoLogoLinkedin />
        </div>
        <div
          className={`${isValidUrl(formDataTrimmed.linkedinLink, true) ? 'text-primary-500' : 'text-red-500'}`}
        >
          LinkedIn:
        </div>
        <div>
          {formDataTrimmed.linkedinLink
            ? `${formDataTrimmed.linkedinLink}`
            : '-'}
        </div>
        <div className={reviewItemStyles}>
          {isValidUrl(formDataTrimmed.linkedinLink, true) ? (
            <IoCheckmarkCircle className='text-primary-500' />
          ) : (
            <IoCloseCircle className='text-red-500' />
          )}
        </div>

        <div
          className={`${reviewItemStyles} ${isValidUrl(formDataTrimmed.portfolioLink) ? 'text-primary-500' : 'text-red-500'}`}
        >
          <IoLinkSharp />
        </div>
        <div
          className={`${isValidUrl(formDataTrimmed.portfolioLink) ? 'text-primary-500' : 'text-red-500'}`}
        >
          Portfolio:
        </div>
        <div>
          {formDataTrimmed.portfolioLink
            ? `${formDataTrimmed.portfolioLink}`
            : '-'}
        </div>
        <div className={reviewItemStyles}>
          {isValidUrl(formDataTrimmed.portfolioLink, true) ? (
            <IoCheckmarkCircle className='text-primary-500' />
          ) : (
            <IoCloseCircle className='text-red-500' />
          )}
        </div>

        <div
          className={`${reviewItemStyles} ${isValidMessage(formDataTrimmed.message) ? 'text-primary-500' : 'text-red-500'}`}
        >
          <IoReader />
        </div>
        <div
          className={`${isValidMessage(formDataTrimmed.message) ? 'text-primary-500' : 'text-red-500'}`}
        >
          Message:
        </div>
        <div className='max-h-40 overflow-y-scroll'>
          {formDataTrimmed.message ? `${formDataTrimmed.message}` : '-'}
        </div>
        <div className={reviewItemStyles}>
          {isValidMessage(formDataTrimmed.linkedinLink) ? (
            <IoCheckmarkCircle className='text-primary-500' />
          ) : (
            <IoCloseCircle className='text-red-500' />
          )}
        </div>
      </div>
    </div>
  );
}

export default SubmitFormReview;
