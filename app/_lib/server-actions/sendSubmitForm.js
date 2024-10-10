'use server';

import { SUBMIT_FORM_VALIDATORS as validators } from '../data';
import { returnTrimmed, validateFields } from '../helperShared';

const { EMAIL_FORM_RECAPTCHA_SECRET_KEY } = process.env;

export async function sendSubmitForm(formData) {
  const trimmedData = returnTrimmed(formData);

  const {
    givenName,
    surname,
    number,
    email,
    resumeFile,
    resumeFileError,
    currentJobTitle,
    linkedinLink,
    portfolioLink,
    message,
    recaptchaToken,
  } = trimmedData;

  const dataFields = {
    givenName,
    surname,
    number,
    email,
    resumeFile,
    resumeFileError,
    currentJobTitle,
    linkedinLink,
    portfolioLink,
    message,
  };

  const isValidRequiredArray = validateFields(dataFields, validators);
  const isValidOptionalArray = validateFields(dataFields, validators, false);

  const isFormValid = [...isValidRequiredArray, ...isValidOptionalArray].every(
    (isValid) => isValid,
  );

  if (!isFormValid)
    return {
      status: 'failed',
      message: 'Validation failed. Please check inputs',
    };

  try {
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: EMAIL_FORM_RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      },
    );

    if (!recaptchaResponse.ok) {
      console.error(
        'Failed to validate reCAPTCHA',
        recaptchaResponse.statusText,
      );
    }

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      console.error('reCAPTCHA validation failed', recaptchaData);
      return { status: 'failed', message: 'reCAPTCHA validation failed' };
    }
  } catch (error) {
    console.error('Error sending data', error.message);
    return { status: 'failed', message: 'Failed to send data' };
  }

  return {
    status: 'success',
    message: 'Form submitted successfully',
  };
}
