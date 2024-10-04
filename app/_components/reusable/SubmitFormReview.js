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

import SubmitFormReviewItem from '@components/reusable/SubmitFormReviewItem';

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
        <SubmitFormReviewItem
          icon={IoPersonCircleSharp}
          label='Name'
          value={
            formDataTrimmed.givenName && formDataTrimmed.surname
              ? `${formDataTrimmed.givenName} ${formDataTrimmed.surname}`
              : null
          }
          isValid={
            isValidName(formDataTrimmed.givenName) &&
            isValidName(formDataTrimmed.surname)
          }
        />

        <SubmitFormReviewItem
          icon={IoPhonePortrait}
          label='Number'
          value={formDataTrimmed.number}
          isValid={isValidPhoneNumber(formDataTrimmed.number)}
        />

        <SubmitFormReviewItem
          icon={IoMail}
          label='Email'
          value={formDataTrimmed.email}
          isValid={isValidEmail(formDataTrimmed.email)}
        />
      </div>

      <h1 className='mb-2 mt-6 text-2xl font-bold text-accent-500 underline'>
        Optional
      </h1>
      <div className='grid grid-cols-[0.15fr,0.25fr,2.5fr,0.5fr] gap-x-2 gap-y-4 sm:gap-x-4 lg:grid-cols-[0.1fr,0.25fr,2.5fr,0.5fr]'>
        <SubmitFormReviewItem
          icon={IoBriefcase}
          label='Current Job Title'
          value={formDataTrimmed.currentJobTitle}
          isValid={isValidJobTitle(formDataTrimmed.currentJobTitle)}
        />

        <SubmitFormReviewItem
          icon={IoLogoLinkedin}
          label='LinkedIn'
          value={formDataTrimmed.linkedinLink}
          isValid={isValidUrl(formDataTrimmed.linkedinLink, true)}
        />

        <SubmitFormReviewItem
          icon={IoLinkSharp}
          label='Portfolio'
          value={formDataTrimmed.portfolioLink}
          isValid={isValidUrl(formDataTrimmed.portfolioLink)}
        />

        <SubmitFormReviewItem
          icon={IoReader}
          label='Message'
          value={formDataTrimmed.message}
          isValid={isValidMessage(formDataTrimmed.message)}
        />
      </div>
    </div>
  );
}

export default SubmitFormReview;
