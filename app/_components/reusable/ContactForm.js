'use client';

import { useState } from 'react';

import { isValidEmail, isValidMessage, isValidName } from '@lib/helperShared';
import { sendContactForm as send } from '@lib/server-actions/sendContactForm';

import Spinner from '@components/reusable/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

const EMAIL_FORM_RECAPTCHA_SITEKEY = '6Le-FUcqAAAAAGBtLzXfW7FeOcA9VLKp911h6L4m';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Company',
    message: '',
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = () => {
    if (sendStatus !== null) setSendStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!recaptchaToken) {
      setSendStatus('failed');
      setIsSubmitting(false);
      return;
    }

    try {
      const { status } = await send({ ...formData, recaptchaToken });
      setSendStatus(status);

      setFormData({
        name: '',
        email: '',
        type: 'Company',
        message: '',
      });

      setRecaptchaToken(null);
    } catch (error) {
      console.log('Form submission error:', error.message);
      setSendStatus('failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="w-full space-y-4 text-gray-700" onSubmit={handleSubmit}>
      {isSubmitting ? (
        <Spinner />
      ) : (
        <>
          <div>
            <label htmlFor="name" className="hidden"></label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Full Name"
              className={`${formItemStyles} ${
                formData.name
                  ? isValidName(formData.name.trim())
                    ? 'bg-primary-500'
                    : 'bg-red-500'
                  : 'bg-white'
              }
              `}
            />
          </div>

          <div>
            <label htmlFor="email" className="hidden"></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Email"
              className={`${formItemStyles} ${
                formData.email
                  ? isValidEmail(formData.email.trim())
                    ? 'bg-primary-500'
                    : 'bg-red-500'
                  : 'bg-white'
              }`}
            />
          </div>

          <div>
            <label htmlFor="type" className="hidden"></label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              onFocus={handleFocus}
              className={`${formItemStyles} ${
                formData.type ? 'bg-primary-500' : 'bg-white'
              }`}
            >
              <option value="Company">Company</option>
              <option value="Candidate">Candidate</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="hidden"></label>
            <textarea
              id="message"
              name="message"
              required
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Message"
              className={`${formItemStyles} ${
                formData.message
                  ? isValidMessage(formData.message.trim())
                    ? 'bg-primary-500'
                    : 'bg-red-500'
                  : 'bg-white'
              }`}
            />
          </div>

          <div>
            <ReCAPTCHA
              sitekey={EMAIL_FORM_RECAPTCHA_SITEKEY}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </div>

          <div className="flex items-center justify-start gap-6">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Submit
            </button>

            {sendStatus && (
              <span
                className={`p-2 text-center rounded-sm ${
                  sendStatus === 'success'
                    ? 'text-green-600 bg-green-300'
                    : 'text-red-600 bg-red-300'
                }`}
              >
                {sendStatus === 'success'
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
