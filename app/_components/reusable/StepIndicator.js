import { useState } from 'react';

function StepIndicator({ step, setStep, length = 3 }) {
  const [formStep, setFormStep] = useState(step || 1);

  const currentStep = step !== undefined ? step : formStep;
  const currentSetStep = setStep !== undefined ? setStep : setFormStep;

  const progressPercentage = (100 / (length - 1)) * (currentStep - 1);

  return (
    <ul className='relative mx-auto flex w-full max-w-xl justify-between'>
      {Array.from({ length: length }, (_, index) => (
        <li
          key={index}
          className={`relative z-10 flex aspect-square h-10 cursor-pointer items-center justify-center rounded-full text-2xl duration-300 ${
            currentStep >= index + 1
              ? 'bg-accent-500 text-white'
              : 'bg-stone-400 hover:bg-primary-500'
          }`}
          onClick={() => currentSetStep(index + 1)}
        >
          {index + 1}
        </li>
      ))}

      <li
        className={`absolute left-1 top-1/2 h-2 w-[calc(100%-10px)] origin-top-left bg-accent-500 duration-300`}
        style={{
          transform: `translateY(-50%) scaleX(${currentStep >= 2 ? progressPercentage / 100 : 0})`,
        }}
      ></li>
    </ul>
  );
}
// ${currentStep >= 2 ? `scale-x-[${50 * (currentStep - 1)}%]` : 'scale-x-0'}

export default StepIndicator;
