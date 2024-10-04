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
  returnTrimmed,
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
    <div className='text-white'>
      <h1 className='mb-2 text-2xl font-bold text-accent-500 underline'>
        Required
      </h1>

      <div className='grid grid-cols-[auto,0.25fr,2.5fr,auto] gap-x-2 gap-y-4 sm:gap-x-4 lg:grid-cols-[auto,0.25fr,2.5fr,auto]'>
        <SubmitFormReviewItem
          icon={IoPersonCircleSharp}
          label='Name'
          value={
            formData.givenName && formData.surname
              ? `${formData.givenName} ${formData.surname}`
              : null
          }
          isValid={
            isValidName(formData.givenName) && isValidName(formData.surname)
          }
        />

        <SubmitFormReviewItem
          icon={IoPhonePortrait}
          label='Number'
          value={formData.number}
          isValid={isValidPhoneNumber(formData.number)}
        />

        <SubmitFormReviewItem
          icon={IoMail}
          label='Email'
          value={formData.email}
          isValid={isValidEmail(formData.email)}
        />
      </div>

      <h1 className='mb-2 mt-6 text-2xl font-bold text-accent-500 underline'>
        Optional
      </h1>
      <div className='xs:grid-cols-[auto,0.25fr,2.5fr,auto] grid grid-cols-[auto,0.25fr,0.75fr,auto] gap-x-2 gap-y-4 sm:gap-x-4 lg:grid-cols-[auto,0.25fr,2.5fr,auto]'>
        <SubmitFormReviewItem
          icon={IoBriefcase}
          label='Current Job Title'
          value={formData.currentJobTitle}
          isValid={isValidJobTitle(formData.currentJobTitle)}
        />

        <SubmitFormReviewItem
          icon={IoLogoLinkedin}
          label='LinkedIn'
          value={formData.linkedinLink}
          isValid={isValidUrl(formData.linkedinLink, true)}
        />

        <SubmitFormReviewItem
          icon={IoLinkSharp}
          label='Portfolio'
          value={formData.portfolioLink}
          isValid={isValidUrl(formData.portfolioLink)}
        />

        <SubmitFormReviewItem
          icon={IoReader}
          label='Message'
          value={formData.message}
          isValid={isValidMessage(formData.message)}
        />
      </div>
    </div>
  );
}

export default SubmitFormReview;
