import {
  IoPersonCircleSharp,
  IoPhonePortrait,
  IoMail,
  IoBriefcase,
  IoLogoLinkedin,
  IoLinkSharp,
  IoReader,
} from 'react-icons/io5';

import {
  isValidEmail,
  isValidJobTitle,
  isValidMessage,
  isValidName,
  isValidPhoneNumber,
  isValidUrl,
  validateObject,
} from '@lib/helperShared';

import SubmitFormReviewItem from '@components/reusable/SubmitFormReviewItem';

function SubmitFormReview({ formData }) {
  const isValidObject = validateObject(formData, 'formData');

  if (!isValidObject)
    console.error(
      'formData is not a valid object. Please check your implementation of useSubmitForm',
    );

  return (
    <>
      <section
        aria-labelledby='form-submit-required-header'
        className='text-white'
      >
        <h2
          id='form-submit-required-header'
          className='mb-2 text-2xl font-bold text-accent-500 underline'
        >
          Required
        </h2>

        <div className='grid grid-cols-[auto,0.2fr,1fr,auto] gap-x-2 gap-y-4 sm:grid-cols-[auto,minmax(0,1fr),minmax(0,2.5fr),auto] sm:gap-x-4 md:grid-cols-[auto,minmax(0,0.75fr),minmax(0,2.5fr),auto] lg:grid-cols-[auto,minmax(0,0.5fr),minmax(0,2.5fr),auto]'>
          <SubmitFormReviewItem
            icon={IoPersonCircleSharp}
            label='Name'
            value={
              formData.givenName && formData.surname
                ? `${formData.givenName} ${formData.surname}`
                : null
            }
            isValid={
              isValidName(formData.givenName).status &&
              isValidName(formData.surname).status
            }
          />

          <SubmitFormReviewItem
            icon={IoPhonePortrait}
            label='Number'
            value={formData.number}
            isValid={isValidPhoneNumber(formData.number).status}
          />

          <SubmitFormReviewItem
            icon={IoMail}
            label='Email'
            value={formData.email}
            isValid={isValidEmail(formData.email).status}
          />

          <SubmitFormReviewItem
            icon={IoMail}
            label='File'
            value={formData.resumeFile?.name}
            isValid={formData.resumeFileError.status || false}
          />
        </div>
      </section>
      <section
        aria-labelledby='form-submit-required-header'
        className='text-white'
      >
        <h2
          id='form-submit-required-header'
          className='mb-2 mt-6 text-2xl font-bold text-accent-500 underline'
        >
          Optional
        </h2>

        <div className='grid grid-cols-[auto,0.2fr,1fr,auto] gap-x-2 gap-y-4 sm:grid-cols-[auto,minmax(0,1fr),minmax(0,2.5fr),auto] sm:gap-x-4 md:grid-cols-[auto,minmax(0,0.75fr),minmax(0,2.5fr),auto] lg:grid-cols-[auto,minmax(0,0.5fr),minmax(0,2.5fr),auto]'>
          <SubmitFormReviewItem
            icon={IoBriefcase}
            label='Job Title'
            value={formData.currentJobTitle}
            isValid={isValidJobTitle(formData.currentJobTitle).status}
          />

          <SubmitFormReviewItem
            icon={IoLogoLinkedin}
            label='LinkedIn'
            value={formData.linkedinLink}
            isValid={isValidUrl(formData.linkedinLink, true).status}
          />

          <SubmitFormReviewItem
            icon={IoLinkSharp}
            label='Portfolio'
            value={formData.portfolioLink}
            isValid={isValidUrl(formData.portfolioLink).status}
          />

          <SubmitFormReviewItem
            icon={IoReader}
            label='Message'
            value={formData.message}
            isValid={isValidMessage(formData.message).status}
          />
        </div>
      </section>
    </>
  );
}

export default SubmitFormReview;
