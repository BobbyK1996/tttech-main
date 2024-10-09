'use client';

import { useSubmitForm } from '@/app/context/submitFormContext';

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

    const isValidRequiredArray = Object.keys(state.formData)
      .map((key) => {
        if (validators.required[key])
          return validators.required[key](state.formData[key]).status;
      })
      .filter((result) => result !== undefined);

    const isValidOptionalArray = Object.keys(state.formData)
      .map((key) => {
        if (validators.optional[key]) {
          if (state.formData[key] !== '')
            return validators.optional[key](state.formData[key]).status;

          return true;
        }
      })
      .filter((result) => result !== undefined);

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
              <Button variant='formSubmit' type='submit'>
                Submit
              </Button>
            </>
          )}
        </>
      )}
    </form>
  );
}

export default SubmitFormFields;
