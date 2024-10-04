import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

const reviewIconStyles = 'text-2xl sm:text-3xl';

const reviewTextStyles = 'text-base sm:text-lg md:text-xl';

function SubmitFormReviewItem({ icon: Icon, label, value, isValid }) {
  if (typeof label !== 'string') {
    console.error(
      `Expected label to be a string but received: ${typeof label}`,
    );
  }

  if (typeof isValid !== 'boolean') {
    console.error(
      `Expected isValid to be a boolean but received: ${typeof isValid}`,
    );
  }

  return (
    <>
      <div
        className={`${reviewIconStyles} ${isValid ? 'text-primary-500' : 'text-red-500'} self-start`}
      >
        <Icon />
      </div>

      <div
        className={`${reviewTextStyles} ${isValid ? 'text-primary-500' : 'text-red-500'} self-start`}
      >
        {`${label}:`}
      </div>

      <div
        className={`${reviewTextStyles} line-clamp-6 self-start break-all align-text-top sm:line-clamp-none`}
      >
        {value || '-'}
      </div>

      <div className={reviewIconStyles}>
        {isValid ? (
          <IoCheckmarkCircle className='align-top text-primary-500' />
        ) : (
          <IoCloseCircle className='text-red-500 align-top' />
        )}
      </div>
    </>
  );
}

export default SubmitFormReviewItem;
