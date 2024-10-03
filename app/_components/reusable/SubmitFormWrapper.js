'use client';
import { useState } from 'react';

import SubmitForm from '@components/reusable/SubmitForm';
import { SubmitFormProvider } from '@/app/context/SubmitFormContext';

function SubmitFormWrapper({ isOpen, onOpen }) {
  const [step, setStep] = useState(1);

  return (
    <SubmitFormProvider>
      <div className='w-full'>
        <button className='w-full bg-accent-500 p-4 text-xl' onClick={onOpen}>
          {!isOpen ? 'Apply!' : 'Go Back'}
        </button>
        {isOpen && <SubmitForm step={step} setStep={setStep} />}
      </div>
    </SubmitFormProvider>
  );
}

export default SubmitFormWrapper;
