'use client';

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

import SubmitFormReview from '@components/reusable/SubmitFormReview';
import InputField from './InputField';

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
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
          <div className='flex w-full flex-col gap-10 md:flex-row'>
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

          <label htmlFor='file-upload' className='hidden'></label>
          <input
            type='file'
            id='file-upload'
            name='resumeFile'
            required
            aria-label='Upload File'
            aria-required='true'
            accept='.pdf, .doc, .docx'
            onChange={handleFileChange}
            className='block w-full p-3 text-white'
          />

          {state.formData.resumeFile === undefined ? (
            <div></div>
          ) : !state.formData.resumeFileError.status ? (
            <div className='mt-2 text-red-500'>
              {state.formData.resumeFileError.message}
            </div>
          ) : (
            <p className='mt-2 text-green-500'>
              Uploaded file: <strong>{state.formData.resumeFile.name}</strong>
            </p>
          )}
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
            className={`${formItemStyles} ${
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
