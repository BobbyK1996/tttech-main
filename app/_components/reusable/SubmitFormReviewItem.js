import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

export const reviewItemStyles = 'text-xl self-start mt-0.5';

function SubmitFormReviewItem({ icon: Icon, label, value, isValid }) {
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
