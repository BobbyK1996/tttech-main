'use client';

import { useSubmitForm } from '@/app/context/submitFormContext';

import { validateFields } from '@lib/helperShared';

import Spinner from '@components/reusable/Spinner';
import SubmitFormFieldsRequired from '@components/reusable/SubmitFormFieldsRequired';
import SubmitFormFieldsOptional from '@components/reusable/SubmitFormFieldsOptional';
import SubmitFormReview from '@components/reusable/SubmitFormReview';
import Button from '@components/reusable/Button';

function SubmitFormFields({ step }) {
  const { state, dispatch, validators } = useSubmitForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_IS_SUBMITTING', payload: true });

    const isValidRequiredArray = validateFields(state.formData, validators);
    const isValidOptionalArray = validateFields(
      state.formData,
      validators,
      false,
    );

    const isFormValid = [
      ...isValidRequiredArray,
      ...isValidOptionalArray,
    ].every((isValid) => isValid);

    if (!state.recaptchaToken || !isFormValid) {
      dispatch({ type: 'SET_SEND_STATUS', payload: 'failed' });
      dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
      return;
    }
  };

  return (
    <form
      className={`mx-auto flex max-w-xs flex-col gap-12 text-black md:max-w-md lg:max-w-2xl`}
      onSubmit={handleSubmit}
    >
      {state.isSubmitting ? (
        <Spinner />
      ) : (
        <>
          {step === 1 && <SubmitFormFieldsRequired />}
          {step === 2 && <SubmitFormFieldsOptional />}
          {step === 3 && (
            <>
              <SubmitFormReview formData={state.formData} />{' '}
              <div className='flex w-full flex-col gap-y-2'>
                <Button variant='formSubmit' type='submit'>
                  Submit
                </Button>
                {state.sendStatus && (
                  <span
                    className={`rounded-sm p-2 text-center sm:px-6 sm:py-4 ${
                      state.sendStatus === 'success'
                        ? 'bg-green-300 text-green-600'
                        : 'bg-red-300 text-red-600'
                    }`}
                  >
                    {state.sendStatus === 'success'
                      ? 'Message sent successfully!'
                      : 'Message failed to send'}
                  </span>
                )}
              </div>
            </>
          )}
        </>
      )}
    </form>
  );
}

export default SubmitFormFields;
