'use client';

import {
  isValidEmail,
  isValidJobTitle,
  isValidMessage,
  isValidName,
  isValidPhoneNumber,
  isValidUrl,
} from '@/app/_lib/helperShared';
import { useReducer } from 'react';

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

const initialState = {
  formData: {
    givenName: '',
    surname: '',
    number: null,
    email: '',
    resumeFile: null,
    currentJobTitle: '',
    linkedinLink: '',
    portfolioLink: '',
    message: '',
  },
  recaptchaToken: null,
  isSubmitting: false,
  sendStatus: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'SET_RECAPTCHA_TOKEN':
      return {
        ...state,
        recaptchaToken: action.payload,
      };
    case 'SET_IS_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'SET_SEND_STATUS':
      return {
        ...state,
        sendStatus: action.payload,
      };
    case 'RESET_FORM':
      return {
        ...state,
        formData: {
          givenName: '',
          surname: '',
          number: null,
          email: '',
          resumeFile: null,
          currentJobTitle: '',
          linkedinLink: '',
          portfolioLink: '',
          message: '',
        },
        recaptchaToken: null,
      };
    default:
      return state;
  }
};

function SubmitFormFields({ step }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file.name);
  //   } else {
  //     setSelectedFile(null);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FORM_DATA', payload: { name, value } });
  };

  return (
    <form className='mx-auto flex max-w-xs flex-col gap-12 text-black md:max-w-md lg:max-w-2xl'>
      {step === 1 && (
        <>
          <div className='flex w-full flex-col gap-10 md:flex-row'>
            <div className='w-full'>
              <label htmlFor='given-name' className='hidden'>
                Name
              </label>
              <input
                type='text'
                id='given-name'
                name='givenName'
                required
                value={state.formData.givenName}
                onChange={handleChange}
                placeholder='Given name'
                autoComplete='given-name'
                aria-label='Given Name'
                aria-required='true'
                className={`flex-grow basis-0 ${formItemStyles} ${state.formData.givenName ? (isValidName(state.formData.givenName.trim()) ? 'bg-primary-500' : 'bg-red-500') : 'bg-white'}`}
              />
            </div>
            <div className='w-full'>
              <label htmlFor='surname' className='hidden'>
                Surname
              </label>
              <input
                type='text'
                id='surname'
                name='surname'
                required
                value={state.formData.surname}
                onChange={handleChange}
                placeholder='Surname'
                autoComplete='family-name'
                aria-label='Surname'
                aria-required='true'
                className={`flex-grow basis-0 ${formItemStyles} ${state.formData.surname ? (isValidName(state.formData.surname.trim()) ? 'bg-primary-500' : 'bg-red-500') : 'bg-white'}`}
              />
            </div>
          </div>

          <label htmlFor='mobile' className='hidden'>
            Mobile number
          </label>
          <input
            type='tel'
            id='mobile'
            name='number'
            required
            value={state.formData.number}
            onChange={handleChange}
            placeholder='Number'
            aria-label='Number'
            aria-required='true'
            autoComplete='mobile tel'
            className={`${formItemStyles} ${
              state.formData.number
                ? isValidPhoneNumber(state.formData.number.trim())
                  ? 'bg-primary-500'
                  : 'bg-red-500'
                : 'bg-white'
            }`}
          />

          <label htmlFor='email' className='hidden'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            value={state.formData.email}
            onChange={handleChange}
            placeholder='Email'
            aria-label='Email'
            aria-required='true'
            autoComplete='email'
            className={`${formItemStyles} ${
              state.formData.email
                ? isValidEmail(state.formData.email.trim())
                  ? 'bg-primary-500'
                  : 'bg-red-500'
                : 'bg-white'
            }`}
          />

          <label htmlFor='file-upload' className='hidden'></label>
          <input
            type='file'
            id='file-upload'
            name='resumeFile'
            required
            onChange={handleChange}
            aria-label='Upload File'
            aria-required='true'
            accept='.pdf, .doc, .docx'
            // onChange={handleFileChange}
            className='block w-full p-3 text-white'
          />

          {state.resumeFile && (
            <p className='mt-2 text-green-500'>
              Selected file: <strong>{selectedFile}</strong>
            </p>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <label htmlFor='job-title' className='hidden'>
            Job Title
          </label>
          <input
            type='text'
            id='job-title'
            name='currentJobTitle'
            value={state.formData.currentJobTitle}
            onChange={handleChange}
            placeholder='Current Job Title'
            aria-label='Current Job Title'
            className={`${formItemStyles} ${
              state.formData.currentJobTitle
                ? isValidJobTitle(state.formData.currentJobTitle.trim())
                  ? 'bg-primary-500'
                  : 'bg-red-500'
                : 'bg-white'
            }`}
          />

          <label htmlFor='linkedin-link' className='hidden'>
            LinkedIn Link
          </label>
          <input
            type='url'
            id='linkedin-link'
            name='linkedinLink'
            value={state.formData.linkedinLink}
            onChange={handleChange}
            placeholder='LinkedIn'
            aria-label='LinkedIn Link'
            className={`${formItemStyles} ${
              state.formData.linkedinLink
                ? isValidUrl(state.formData.linkedinLink.trim(), true)
                  ? 'bg-primary-500'
                  : 'bg-red-500'
                : 'bg-white'
            }`}
          />

          <label htmlFor='portfolio-link' className='hidden'>
            Portfolio Link
          </label>
          <input
            type='url'
            id='portfolio-link'
            name='portfolioLink'
            value={state.formData.portfolioLink}
            onChange={handleChange}
            placeholder='Digital Portfolio (GitHub, Behance, Dribbble, etc)'
            aria-label='Portfolio Link'
            className={`${formItemStyles} ${
              state.formData.portfolioLink
                ? isValidUrl(state.formData.portfolioLink.trim())
                  ? 'bg-primary-500'
                  : 'bg-red-500'
                : 'bg-white'
            }`}
          />

          <label htmlFor='message' className='hidden'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            value={state.formData.message}
            onChange={handleChange}
            placeholder='Message (Brief cover letter)'
            aria-label='Message'
            className={`${formItemStyles} ${
              state.formData.message
                ? isValidMessage(state.formData.message.trim())
                  ? 'bg-primary-500'
                  : 'bg-red-500'
                : 'bg-white'
            }`}
          />
        </>
      )}
    </form>
  );
}

export default SubmitFormFields;
