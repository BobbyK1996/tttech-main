import { memo } from 'react';

import { validateFunction, validateString } from '@lib/helperShared';

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

function InputField({
  name,
  type = 'text',
  placeholder = 'Placeholder',
  value,
  handleChange,
  handleBlur,
  required = false,
  validationFunc,
  customCSS = '',
}) {
  const isValidName = validateString(name, 'Name');
  const isValidPlaceholder = validateString(placeholder, 'Placeholder');
  const isValidValue = typeof value === 'string';
  const isValidHandleChange = validateFunction(handleChange, 'handleChange');
  const isValidHandleBlur = validateFunction(handleBlur, 'handleBlur');
  const isValidRequired = typeof required === 'boolean';
  const isValidValidationFunc = validateFunction(
    validationFunc,
    'Validation Func',
  );
  const isValidCustomCSS = typeof customCSS === 'string';

  if (
    !isValidName ||
    !isValidPlaceholder ||
    !isValidValue ||
    !isValidHandleChange ||
    !isValidHandleBlur ||
    !isValidRequired ||
    !isValidValidationFunc ||
    !isValidCustomCSS
  )
    console.error('Error in one of the input props');

  const isValid = validationFunc ? validationFunc(value.trim()) : true;

  return (
    <div className='flex flex-col'>
      <label htmlFor={name} className='sr-only'>
        {name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        aria-label={placeholder}
        aria-required={required}
        className={`${formItemStyles} ${value ? (isValid ? 'bg-primary-500' : 'bg-red-500') : 'bg-white focus:bg-primary-500 focus:placeholder-white'} ${customCSS}`}
      />
    </div>
  );
}

export default memo(InputField);
