'use client';

import { SUBMIT_FORM_MESSAGES as messages } from '@lib/data';

import StepIndicator from '@components/reusable/StepIndicator';
import StepArrowButtons from '@components/reusable/StepArrowButtons';
import { useEffect, useState } from 'react';

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

function StepMessage({ children }) {
  return (
    <p className='flex flex-col items-center mx-10 text-xl font-bold text-center'>
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

  const isInputField = (target) => {
    return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
  };

  useEffect(() => {
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    const formElement = document.getElementById('form-swipe-container');

    const handleStart = (x) => {
      startX = x;
      currentX = x;
      isSwiping = true;
    };

    const handleMove = (x) => {
      if (!isSwiping || !formElement) return;

      currentX = x;

      if (Math.abs(currentX - startX) > 50) {
        formElement.style.opacity = 0.5;
        formElement.style.scale = 0.98;
      }
    };

    const handleEnd = (e) => {
      if (!formElement) return;

      const swipeDistance = startX - currentX;
      formElement.style.opacity = 1;
      formElement.style.scale = 1;

      if (swipeDistance > 50 && step < 3) {
        setStep(step + 1);
      }

      if (swipeDistance < -50 && step > 1) {
        setStep(step - 1);
      }

      isSwiping = false;
    };

    const handleTouchStart = (e) => {
      if (isInputField(e.target)) return;
      handleStart(e.touches[0].clientX);
    };
    const handleTouchMove = (e) => {
      if (isInputField(e.target)) return;
      handleMove(e.touches[0].clientX);
    };

    const handleMouseStart = (e) => {
      if (isInputField(e.target)) return;
      handleStart(e.clientX);
    };
    const handleMouseMove = (e) => {
      if (isInputField(e.target)) return;
      handleMove(e.clientX);
    };

    if (formElement) {
      formElement.addEventListener('mousedown', handleMouseStart);
      formElement.addEventListener('mousemove', handleMouseMove);
      formElement.addEventListener('mouseup', handleEnd);
      formElement.addEventListener('mouseleave', handleEnd);

      formElement.addEventListener('touchstart', handleTouchStart);
      formElement.addEventListener('touchmove', handleTouchMove);
      formElement.addEventListener('touchend', handleEnd);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener('mousedown', handleMouseStart);
        formElement.removeEventListener('mousemove', handleMouseMove);
        formElement.removeEventListener('mouseup', handleEnd);
        formElement.removeEventListener('mouseleave', handleEnd);

        formElement.removeEventListener('touchstart', handleTouchStart);
        formElement.removeEventListener('touchmove', handleTouchMove);
        formElement.removeEventListener('touchend', handleEnd);
      }
    };
  }, [step, setStep]);

  return (
    <div
      className='relative flex flex-col gap-10 px-10 duration-200 select-none py-14'
      id='form-swipe-container'
    >
      <StepIndicator step={step} setStep={setStep} />

      <StepMessage>{messages[step - 1]}</StepMessage>

      <div className='relative min-h-[430px] md:min-h-96'>
        <StepArrowButtons
          step={step}
          setStep={setStep}
          customCSS='hidden sm:block'
        />

        <form className='flex flex-col max-w-xs gap-12 mx-auto text-black md:max-w-md lg:max-w-2xl'>
          {step === 1 && (
            <>
              <div className='flex flex-col w-full gap-10 md:flex-row'>
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
                    aria-required='true'
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
                    aria-required='true'
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
                name='mobile'
                required
                placeholder='Number'
                aria-label='Number'
                aria-required='true'
                autoComplete='mobile tel'
                className={formItemStyles}
              />

              <label htmlFor='email' className='hidden'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                required
                placeholder='Email'
                aria-label='Email'
                aria-required='true'
                autoComplete='email'
                className={formItemStyles}
              />

              <label htmlFor='file-upload' className='hidden'></label>
              <input
                type='file'
                id='file-upload'
                name='file-upload'
                required
                aria-label='Upload File'
                aria-required='true'
                accept='.pdf, .doc, .docx'
                onChange={handleFileChange}
                className='block w-full p-3 text-white'
              />

              {selectedFile && (
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
                name='job-title'
                placeholder='Current Job Title'
                aria-label='Current Job Title'
                className={formItemStyles}
              />

              <label htmlFor='linkedin-link' className='hidden'>
                LinkedIn Link
              </label>
              <input
                type='url'
                id='linkedin-link'
                name='linkedin-link'
                placeholder='LinkedIn'
                aria-label='LinkedIn Link'
                className={formItemStyles}
              />

              <label htmlFor='portfolio-link' className='hidden'>
                Portfolio Link
              </label>
              <input
                type='url'
                id='portfolio-link'
                name='portfolio-link'
                placeholder='Digital Portfolio (GitHub, Behance, Dribbble, etc)'
                aria-label='Portfolio Link'
                className={formItemStyles}
              />

              <label htmlFor='message' className='hidden'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                placeholder='Message (Brief cover letter)'
                aria-label='Message'
                className={formItemStyles}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SubmitForm;
