import { memo } from 'react';

import { validateFunction } from '@lib/helperShared';

function FileUpload({ onFileChange, customCSS = '' }) {
  const isValidFunction = validateFunction(onFileChange, 'onFileChange');
  const isValidCustomCSS = typeof customCSS === 'string';

  if (!isValidFunction || !isValidCustomCSS) {
    console.error(
      'Either onFileChange is not a valid function, or customCSS is defined as a non-string',
    );
    return null;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    onFileChange(file);
  };

  return (
    <>
      <label htmlFor='file-upload' className='hidden'>
        Select CV
      </label>
      <button
        type='button'
        onClick={() => document.getElementById('file-upload').click()}
        className={`border border-black ${customCSS}`}
        aria-label='Select CV'
      >
        Select CV
      </button>
      <input
        type='file'
        id='file-upload'
        name='resumeFile'
        required
        aria-label='Upload File'
        aria-required='true'
        accept='.pdf, .doc, .docx'
        onChange={handleFileChange}
        className='hidden'
      />
    </>
  );
}

export default memo(FileUpload);
