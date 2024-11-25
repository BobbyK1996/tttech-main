// import { returnTrimmed, validateString } from '@helpers/indexShared';
import { returnTrimmed, validateString } from '@helpers/indexShared';

function JobIDText({ header, children }) {
  const isValidHeader = validateString(header, 'Header');

  const trimmedContent = returnTrimmed(children);
  const isContentArray = Array.isArray(trimmedContent);
  const isValidStringBody = isContentArray
    ? trimmedContent.every((item) => validateString(item, 'Body Item'))
    : validateString(trimmedContent, 'Body Item');

  return (
    <div>
      {header === undefined ? null : !isValidHeader ? (
        <span className='bg-red-300 text-red-500' role='alert'>
          Header is not valid. Please use a non-empty string
        </span>
      ) : (
        <h1 className="relative mb-4 inline-block border-b border-primary-200 text-3xl text-accent-300 duration-200 ease-in-out before:absolute before:bottom-0 before:left-0 before:w-full before:origin-bottom-left before:scale-x-0 before:scale-y-0 before:border-b-2 before:border-l-2 before:border-primary-200 before:transition-transform before:duration-300 before:ease-in-out before:content-[''] after:absolute after:right-0 after:top-0 after:w-full after:origin-top-right after:scale-x-0 after:scale-y-0 after:border-r-2 after:border-t-2 after:border-primary-200 after:transition-transform after:duration-300 after:ease-in-out after:content-[''] hover:border-transparent hover:before:scale-x-100 hover:before:scale-y-100 hover:after:scale-x-100 hover:after:scale-y-100 sm:text-4xl">
          {header}
        </h1>
      )}
      {!isContentArray && isValidStringBody && <p>{trimmedContent}</p>}

      {isContentArray && isValidStringBody && (
        <ul className='pl-10'>
          {trimmedContent.map((item, index) => (
            <li className='list-disc' key={index}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobIDText;
