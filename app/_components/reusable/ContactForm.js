'use client';

import { useReducer } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { initialState, reducer } from '@lib/reducers/emailFormReducer';
import { sendContactForm as send } from '@lib/server-actions/sendContactForm';
// import { isValidEmail, isValidMessage, isValidName } from '@helpers/indexShared';
import {
  isValidEmail,
  isValidMessage,
  isValidName,
} from '@helpers/indexShared';

import Spinner from '@components/reusable/Spinner';
import useMediaQuery from '@lib/hooks/useMediaQuery';

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

const EMAIL_FORM_RECAPTCHA_SITEKEY = '6Le-FUcqAAAAAGBtLzXfW7FeOcA9VLKp911h6L4m';

function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isMobile = useMediaQuery('(max-width: 425px)');

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FORM_DATA', payload: { name, value } });
  };

  const handleFocus = () => {
    if (state.sendStatus !== null)
      dispatch({ type: 'SET_SEND_STATUS', payload: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_IS_SUBMITTING', payload: true });

    if (!state.recaptchaToken) {
      dispatch({ type: 'SET_SEND_STATUS', payload: 'failed' });
      dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
      return;
    }

    try {
      const { status } = await send({
        ...state.formData,
        recaptchaToken: state.recaptchaToken,
      });
      dispatch({ type: 'SET_SEND_STATUS', payload: status });

      dispatch({ type: 'RESET_FORM' });
    } catch (error) {
      console.log('Form submission error:', error.message);
      dispatch({ type: 'SET_SEND_STATUS', payload: 'failed' });
    } finally {
      dispatch({ type: 'SET_IS_SUBMITTING', payload: false });
    }
  };

  return (
    <form className='w-full space-y-4 text-gray-700' onSubmit={handleSubmit}>
      {state.isSubmitting ? (
        <Spinner />
      ) : (
        <>
          <div>
            <label htmlFor='name' className='hidden'></label>
            <input
              type='text'
              id='name'
              name='name'
              required
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder='Full Name'
              aria-label='Full Name'
              autoComplete='name'
              className={`${formItemStyles} ${
                state.formData.name
                  ? isValidName(state.formData.name.trim()).status
                    ? 'bg-primary-500'
                    : 'bg-red-500'
                  : 'bg-white'
              } `}
            />
          </div>

          <div>
            <label htmlFor='email' className='hidden'></label>
            <input
              type='email'
              id='email'
              name='email'
              required
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder='Email'
              aria-label='Email'
              autoComplete='email'
              className={`${formItemStyles} ${
                state.formData.email
                  ? isValidEmail(state.formData.email.trim()).status
                    ? 'bg-primary-500'
                    : 'bg-red-500'
                  : 'bg-white'
              }`}
            />
          </div>

          <div>
            <label htmlFor='type' className='hidden'></label>
            <select
              id='type'
              name='type'
              onChange={handleChange}
              onFocus={handleFocus}
              aria-label='CandidateOrClient'
              className={`${formItemStyles} max-w-[304px] ${
                state.formData.type ? 'bg-primary-500' : 'bg-white'
              }`}
            >
              <option value='Company'>Company</option>
              <option value='Candidate'>Candidate</option>
            </select>
          </div>

          <div>
            <label htmlFor='message' className='hidden'></label>
            <textarea
              id='message'
              name='message'
              required
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder='Message'
              aria-label='Message'
              className={`${formItemStyles} ${
                state.formData.message
                  ? isValidMessage(state.formData.message.trim()).status
                    ? 'bg-primary-500'
                    : 'bg-red-500'
                  : 'bg-white'
              }`}
            />
          </div>

          <div>
            {isMobile ? (
              <ReCAPTCHA
                key='recaptcha-compact'
                sitekey={EMAIL_FORM_RECAPTCHA_SITEKEY}
                onChange={(token) =>
                  dispatch({ type: 'SET_RECAPTCHA_TOKEN', payload: token })
                }
                size='compact'
              />
            ) : (
              <ReCAPTCHA
                key='recaptcha-normal'
                sitekey={EMAIL_FORM_RECAPTCHA_SITEKEY}
                onChange={(token) =>
                  dispatch({ type: 'SET_RECAPTCHA_TOKEN', payload: token })
                }
              />
            )}
          </div>

          <div className='flex items-center justify-start gap-6'>
            <button
              type='submit'
              className='rounded bg-blue-500 px-4 py-2 text-white sm:px-6 sm:py-4'
            >
              Submit
            </button>

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
    </form>
  );
}

export default ContactForm;
