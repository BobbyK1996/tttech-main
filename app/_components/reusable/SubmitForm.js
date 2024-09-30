'use client';

import { SUBMIT_FORM_MESSAGES as messages } from '@lib/data';

import StepIndicator from '@components/reusable/StepIndicator';
import StepArrowButtons from '@components/reusable/StepArrowButtons';
import { useState } from 'react';

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

function StepMessage({ children }) {
  return (
    <p className='mx-10 flex flex-col items-center text-center text-xl font-bold'>
      {children}
    </p>
  );
}

function SubmitForm({ step, setStep }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <div className='relative flex flex-col gap-10 px-10 py-14'>
      <StepIndicator step={step} setStep={setStep} />

      <StepMessage>{messages[step - 1]}</StepMessage>

      <div className='relative'>
        <StepArrowButtons step={step} setStep={setStep} />

        <form className='mx-auto flex max-w-2xl flex-col gap-12 text-black'>
          <div className='flex w-full gap-10'>
            <div className='w-full'>
              <label htmlFor='given-name' className='hidden'>
                Name
              </label>
              <input
                type='text'
                id='given-name'
                name='given-name'
                required
                placeholder='Given name'
                autoComplete='given-name'
                aria-label='Given Name'
                className={`flex-grow basis-0 ${formItemStyles}`}
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
                placeholder='Surname'
                autoComplete='family-name'
                aria-label='Surname'
                className={`flex-grow basis-0 ${formItemStyles}`}
              />
            </div>
          </div>

          <label htmlFor='mobile' className='hidden'>
            Mobile number
          </label>
          <input
            type='tel'
            id='mobile'
            placeholder='Number'
            aria-label='Number'
            autoComplete='mobile tel'
            className={formItemStyles}
          />

          <label htmlFor='email' className='hidden'>
            Email
          </label>
          <input
            type='email'
            id='email'
            placeholder='Email'
            aria-label='Email'
            autoComplete='email'
            className={formItemStyles}
          />

          <label htmlFor='file-upload' className='hidden'></label>
          <input
            type='file'
            id='file-upload'
            aria-label='Upload File'
            accept='.pdf, .doc, .docx'
            onChange={handleFileChange}
          />

          {selectedFile && (
            <p className='mt-2 text-green-500'>
              Selected file: <strong>{selectedFile}</strong>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default SubmitForm;
