'use client';

import { useState } from 'react';
import SubmitForm from '@components/reusable/SubmitForm';

function SubmitFormWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();

    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full">
      <button className="w-full p-4 bg-green-500" onClick={handleOpen}>
        {!isOpen ? 'Apply!' : 'Close Application'}
      </button>
      {isOpen && <SubmitForm />}
    </div>
  );
}

export default SubmitFormWrapper;
