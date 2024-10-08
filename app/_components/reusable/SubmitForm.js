'use client';

import { useEffect, useRef, useState } from 'react';

import { SUBMIT_FORM_MESSAGES as messages } from '@lib/data';
import useSwipe from '@lib/hooks/useSwipe';

import StepIndicator from '@components/reusable/StepIndicator';
import StepArrowButtons from '@components/reusable/StepArrowButtons';
import SubmitFormFields from '@components/reusable/SubmitFormFields';

function StepMessage({ children }) {
  return (
    <p className='mx-10 flex flex-col items-center text-center text-xl font-bold'>
      {children}
    </p>
  );
}

function SubmitForm({ step, setStep }) {
  const formRef = useRef(null);

  useSwipe(formRef, step, setStep);

  return (
    <div
      className='relative flex select-none flex-col gap-10 px-4 py-14 duration-200 sm:px-10'
      ref={formRef}
    >
      <StepIndicator step={step} setStep={setStep} formRef={formRef} />

      <StepMessage>{messages[step - 1]}</StepMessage>

      <div className='relative min-h-[520px] md:min-h-[600px]'>
        <StepArrowButtons
          step={step}
          setStep={setStep}
          customCSS='hidden sm:block'
        />

        <SubmitFormFields step={step} />
      </div>
    </div>
  );
}

export default SubmitForm;
