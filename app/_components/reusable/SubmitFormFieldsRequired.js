import ReCAPTCHA from 'react-google-recaptcha';

import { useSubmitForm } from '@/app/context/submitFormContext';

import useMediaQuery from '@lib/hooks/useMediaQuery';

import InputField from '@components/reusable/InputField';
import FileUpload from '@components/reusable/FileUpload';
import RenderFileUploadMessage from '@components/reusable/RenderFileUploadMessage';

const EMAIL_FORM_RECAPTCHA_SITEKEY = '6Le-FUcqAAAAAGBtLzXfW7FeOcA9VLKp911h6L4m';

function SubmitFormFieldsRequired() {
  const {
    state: { formData },
    dispatch,
    handleChange,
    handleBlur,
    handleFileChange,
    validators: { required: validators },
    formItemStyles,
  } = useSubmitForm();

  const isMobile = useMediaQuery('(max-width: 425px)');

  return (
    <>
      <div className='flex w-full flex-col items-start gap-10 md:flex-row'>
        <div className='w-full'>
          <InputField
            name='givenName'
            placeholder='Given name'
            value={formData.givenName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={true}
            validationFunc={validators.givenName}
            customCSS={`${formItemStyles} flex-grow basis-0`}
          />
        </div>

        <div className='w-full'>
          <InputField
            name='surname'
            placeholder='Surname'
            value={formData.surname}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={true}
            validationFunc={validators.surname}
            customCSS={`${formItemStyles} flex-grow basis-0`}
          />
        </div>
      </div>

      <InputField
        name='number'
        type='tel'
        placeholder='Number'
        value={formData.number}
        handleChange={handleChange}
        handleBlur={handleBlur}
        required={true}
        validationFunc={validators.number}
        customCSS={formItemStyles}
      />

      <InputField
        name='email'
        type='email'
        placeholder='Email'
        value={formData.email}
        handleChange={handleChange}
        handleBlur={handleBlur}
        required={true}
        validationFunc={validators.email}
        customCSS={formItemStyles}
      />

      <div className='flex flex-col gap-x-4 lg:flex-row'>
        <FileUpload
          onFileChange={handleFileChange}
          customCSS='max-w-80 rounded bg-primary-500 px-4 py-2 text-white duration-200 hover:bg-primary-400 sm:px-6 sm:py-4 md:max-w-[304px] basis-full'
        />

        <RenderFileUploadMessage
          resumeFile={formData.resumeFile}
          resumeFileError={formData.resumeFileError}
        />
      </div>

      <div>
        {isMobile ? (
          <ReCAPTCHA
            key='recaptcha-compact'
            sitekey={EMAIL_FORM_RECAPTCHA_SITEKEY}
            onChange={(token) =>
              dispatch({ type: 'SET_RECAPTCHA_TOKEN', payload: token })
            }
            size='compact'
          />
        ) : (
          <ReCAPTCHA
            key='recaptcha-normal'
            sitekey={EMAIL_FORM_RECAPTCHA_SITEKEY}
            onChange={(token) =>
              dispatch({ type: 'SET_RECAPTCHA_TOKEN', payload: token })
            }
          />
        )}
      </div>
    </>
  );
}

export default SubmitFormFieldsRequired;
