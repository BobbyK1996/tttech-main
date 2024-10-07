'use client';

import ReCAPTCHA from 'react-google-recaptcha';

import { useSubmitForm } from '@/app/context/submitFormContext';

import {
  isValidEmail,
  isValidJobTitle,
  isValidMessage,
  isValidName,
  isValidPhoneNumber,
  isValidUrl,
  validateFile,
} from '@lib/helperShared';

import { VALID_FILE_TYPES } from '@lib/data';
import useMediaQuery from '@lib/hooks/useMediaQuery';

import SubmitFormReview from '@components/reusable/SubmitFormReview';
import InputField from '@components/reusable/InputField';
import FileUpload from '@components/reusable/FileUpload';

const EMAIL_FORM_RECAPTCHA_SITEKEY = '6Le-FUcqAAAAAGBtLzXfW7FeOcA9VLKp911h6L4m';

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

const validators = {
  givenName: isValidName,
  surname: isValidName,
  number: isValidPhoneNumber,
  email: isValidEmail,
  currentJobTitle: isValidJobTitle,
  linkedinLink: (value) => isValidUrl(value, true),
  portfolioLink: isValidUrl,
  message: isValidMessage,
};

function SubmitFormFields({ step }) {
  const { state, dispatch } = useSubmitForm();

  const isMobile = useMediaQuery('(max-width: 425px)');

  const handleChange = (e) => {
    const { name, value } = e.target;

    const isValidPrimitive = typeof value === 'string' || value === null;

    if (isValidPrimitive) {
      dispatch({
        type: 'SET_FORM_DATA',
        payload: {
          name,
          value,
        },
      });
    } else {
      console.error(`${name} should be a valid primitive`);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const trimmedValue = typeof value === 'string' ? value.trim() : null;

    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        name,
        value: trimmedValue,
      },
    });
  };

  const handleFileChange = (file) => {
    const isValidFile = validateFile(file, VALID_FILE_TYPES);

    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        name: 'resumeFile',
        value: isValidFile.status ? file : null,
      },
    });

    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        name: 'resumeFileError',
        value: isValidFile,
      },
    });
  };

  return (
    <form
      className={`mx-auto flex max-w-xs flex-col gap-12 text-black md:max-w-md lg:max-w-2xl`}
    >
      {step === 1 && (
        <>
          <div className='flex w-full flex-col items-start gap-10 md:flex-row'>
            <div className='w-full'>
              <InputField
                name='givenName'
                placeholder='Given name'
                value={state.formData.givenName}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required={true}
                validationFunc={validators.givenName}
                customCSS='flex-grow basis-0'
              />
            </div>

            <div className='w-full'>
              <InputField
                name='surname'
                placeholder='Surname'
                value={state.formData.surname}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required={true}
                validationFunc={validators.surname}
                customCSS='flex-grow basis-0'
              />
            </div>
          </div>

          <InputField
            name='number'
            type='tel'
            placeholder='Number'
            value={state.formData.number}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={true}
            validationFunc={validators.number}
          />

          <InputField
            name='email'
            type='email'
            placeholder='Email'
            value={state.formData.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={true}
            validationFunc={validators.email}
          />

          <div className='flex flex-col gap-x-4 lg:flex-row'>
            <FileUpload
              onFileChange={handleFileChange}
              customCSS='max-w-80 rounded bg-primary-500 px-4 py-2 text-white duration-200 hover:bg-primary-400 sm:px-6 sm:py-4 md:max-w-[304px] basis-full'
            />

            {state.formData.resumeFile === undefined ? null : state.formData
                .resumeFileError.status ? (
              <span className='flex items-center gap-x-2 text-green-500'>
                <span className='min-w-max'>Uploaded file: </span>
                <strong>{state.formData.resumeFile.name}</strong>
              </span>
            ) : (
              <span className='flex items-center text-red-500'>
                {state.formData.resumeFileError.message}
              </span>
            )}
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
      )}

      {step === 2 && (
        <>
          <InputField
            name='currentJobTitle'
            placeholder='Current Job Title'
            value={state.formData.currentJobTitle}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={true}
            validationFunc={validators.currentJobTitle}
          />

          <InputField
            name='linkedinLink'
            placeholder='Linkedin'
            value={state.formData.linkedinLink}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={true}
            validationFunc={validators.linkedinLink}
          />

          <InputField
            name='portfolioLink'
            placeholder='Digital Portfolio (GitHub, Behance, Dribbble, etc)'
            value={state.formData.portfolioLink}
            handleChange={handleChange}
            handleBlur={handleBlur}
            required={true}
            validationFunc={validators.portfolioLink}
          />

          <label htmlFor='message' className='hidden'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            value={state.formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Message (Brief cover letter)'
            aria-label='Message'
            className={`min-h-52 ${formItemStyles} ${
              state.formData.message
                ? isValidMessage(state.formData.message.trim())
                  ? 'bg-primary-500'
                  : 'bg-red-500'
                : 'bg-white focus:bg-primary-500 focus:placeholder-white'
            }`}
          />
        </>
      )}

      {step === 3 && <SubmitFormReview formData={state.formData} />}
    </form>
  );
}

export default SubmitFormFields;
