import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

export const reviewItemStyles = 'text-xl self-start mt-0.5';

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
        className={`${reviewItemStyles} ${isValid ? 'text-primary-500' : 'text-red-500'}`}
      >
        <Icon />
      </div>

      <div className={`${isValid ? 'text-primary-500' : 'text-red-500'}`}>
        {`${label}:`}
      </div>

      <div>{value || '-'}</div>

      <div className={reviewItemStyles}>
        {isValid ? (
          <IoCheckmarkCircle className='text-primary-500' />
        ) : (
          <IoCloseCircle className='text-red-500' />
        )}
      </div>
    </>
  );
}

export default SubmitFormReviewItem;
