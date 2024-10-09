import { useSubmitForm } from '@/app/context/submitFormContext';

import InputField from '@components/reusable/InputField';

function SubmitFormFieldsOptional() {
  const {
    state: { formData },
    handleChange,
    handleBlur,
    validators: { optional: validators },
    formItemStyles,
  } = useSubmitForm();

  return (
    <>
      <InputField
        name='currentJobTitle'
        placeholder='Current Job Title'
        value={formData.currentJobTitle}
        handleChange={handleChange}
        handleBlur={handleBlur}
        required={true}
        validationFunc={validators.currentJobTitle}
        customCSS={formItemStyles}
      />

      <InputField
        name='linkedinLink'
        placeholder='Linkedin'
        value={formData.linkedinLink}
        handleChange={handleChange}
        handleBlur={handleBlur}
        required={true}
        validationFunc={validators.linkedinLink}
        customCSS={formItemStyles}
      />

      <InputField
        name='portfolioLink'
        placeholder='Digital Portfolio (GitHub, Behance, Dribbble, etc)'
        value={formData.portfolioLink}
        handleChange={handleChange}
        handleBlur={handleBlur}
        required={true}
        validationFunc={validators.portfolioLink}
        customCSS={formItemStyles}
      />

      <label htmlFor='message' className='hidden'>
        Message
      </label>
      <textarea
        id='message'
        name='message'
        value={formData.message}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='Message (Brief cover letter)'
        aria-label='Message'
        className={`min-h-64 ${formItemStyles} ${
          formData.message
            ? validators.message(formData.message.trim()).status
              ? 'bg-primary-500'
              : 'bg-red-500'
            : 'bg-white focus:bg-primary-500 focus:placeholder-white'
        }`}
      />
    </>
  );
}

export default SubmitFormFieldsOptional;
