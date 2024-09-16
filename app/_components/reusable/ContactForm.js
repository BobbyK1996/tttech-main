'use client';

import { useState } from 'react';

import { sendContactForm as send } from '@lib/server-actions/sendContactForm';

const formItemStyles =
  'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Company',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="w-full space-y-4 text-gray-700" action={send}>
      <div>
        <label htmlFor="name" className="hidden"></label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className={`${formItemStyles} ${
            formData.name ? 'bg-primary-500' : 'bg-white'
          }`}
        />
      </div>

      <div>
        <label htmlFor="email" className="hidden"></label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className={`${formItemStyles} ${
            formData.email ? 'bg-primary-500' : 'bg-white'
          }`}
        />
      </div>

      <div>
        <label htmlFor="type" className="hidden"></label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
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
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className={`${formItemStyles} ${
            formData.message ? 'bg-primary-500' : 'bg-white'
          }`}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
