import { useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

// import { validateNumber, validateString } from '@helpers/indexShared';
import { validateNumber, validateString } from '@helpers/indexShared';

import Button from '@components/reusable/Button';

function StepArrowButtons({ step, setStep, maxSteps = 3, customCSS = '' }) {
  const isValidMaxSteps = validateNumber(maxSteps, 'Max Step');
  if (!isValidMaxSteps || maxSteps < 1)
    throw new Error(
      'Invalid maxSteps prop. Please provide a numerical value greater than one',
    );

  //don't care if CSS is undefined or an empty string
  validateString(customCSS, 'CustomCSS');

  const [formStep, setFormStep] = useState(step || 1);

  const isValidStep = validateNumber(formStep, 'Step');
  if (!isValidStep)
    throw new Error(
      'Invalid step prop. Please provide step with a numerical value',
    );

  const currentStep = step !== undefined ? step : formStep;
  const currentSetStep = setStep !== undefined ? setStep : setFormStep;

  const handlePrevious = () => {
    if (currentStep > 1) currentSetStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < maxSteps) currentSetStep(currentStep + 1);
  };

  return (
    <>
      {currentStep > 1 && (
        <Button
          onClick={handlePrevious}
          variant='arrow'
          customCSS={`left-0 bottom-1/2 -translate-y-1/2  rounded-tl-full rounded-bl-full bg-accent-500 hover:bg-primary-500 duration-300 ${customCSS}`}
        >
          <span className='text-4xl'>
            <MdNavigateBefore />
          </span>
        </Button>
      )}

      {currentStep < maxSteps && (
        <Button
          onClick={handleNext}
          variant='arrow'
          customCSS={`right-0 bottom-1/2 -translate-y-1/2 rounded-tr-full rounded-br-full bg-accent-500 hover:bg-primary-500 duration-300 ${customCSS}`}
        >
          <span className='text-4xl'>
            <MdNavigateNext />
          </span>
        </Button>
      )}
    </>
  );
}

export default StepArrowButtons;
