'use client';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

import Button from '@components/reusable/Button';
import StepIndicator from './StepIndicator';

const messages = ['Required', 'Optional (but helpful!)', 'Review & Submit'];

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

function StepMessage({ children }) {
  return (
    <p className='mx-10 flex flex-col items-center text-center text-xl font-bold'>
      {children}
    </p>
  );
}

// function Button({ onClick, customCSS, children }) {
//   return (
//     <button className={`absolute ${customCSS}`} onClick={onClick}>
//       {children}
//     </button>
//   );
// }

function SubmitForm({ step, setStep }) {
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className='relative flex flex-col gap-10 px-10 py-14'>
      <StepIndicator step={step} setStep={setStep} />

      <StepMessage>{messages[step - 1]}</StepMessage>

      <div className='relative'>
        {step > 1 && (
          <Button
            onClick={handlePrevious}
            type='arrow'
            customCSS='left-0 bottom-1/2 -translate-y-1/2  rounded-tl-full rounded-bl-full bg-accent-500 hover:bg-primary-500 duration-300'
          >
            <span className='text-4xl'>
              <MdNavigateBefore />
            </span>
          </Button>
        )}

        {step < 3 && (
          <Button
            onClick={handleNext}
            type='arrow'
            customCSS='right-0 bottom-1/2 -translate-y-1/2 rounded-tr-full rounded-br-full bg-accent-500 hover:bg-primary-500 duration-300'
          >
            <span className='text-4xl'>
              <MdNavigateNext />
            </span>
          </Button>
        )}
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
        </form>
      </div>
    </div>
  );
}

export default SubmitForm;
