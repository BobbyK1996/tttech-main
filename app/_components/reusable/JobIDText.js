import { returnTrimmed, validateString } from '@lib/helperShared';

function JobIDText({ header, children }) {
  const isValidHeader = validateString(header, 'Header');

  const trimmedContent = returnTrimmed(children);
  const isContentArray = Array.isArray(trimmedContent);
  const isValidStringBody = isContentArray
    ? trimmedContent.every((item) => validateString(item, 'Body Item'))
    : validateString(trimmedContent, 'Body Item');

  return (
    <div>
      {!isValidHeader ? (
        <span className="text-red-500 bg-red-300" role="alert">
          Header is not valid. Please use a non-empty string
        </span>
      ) : (
        <h1 className="inline-block mb-4 text-4xl border-b  hover:border-transparent border-primary-200 text-accent-300 relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-full before:border-l-2 before:border-b-2 before:border-primary-200 before:scale-x-0 before:scale-y-0 before:transition-transform before:duration-300 before:ease-in-out before:origin-bottom-left hover:before:scale-x-100 hover:before:scale-y-100 after:content-[''] after:absolute after:right-0 after:top-0 after:w-full after:border-r-2 after:border-t-2 after:border-primary-200 after:scale-x-0 after:scale-y-0 after:transition-transform after:duration-300 after:ease-in-out after:origin-top-right hover:after:scale-x-100 hover:after:scale-y-100 duration-200 ease-in-out">
          {header}
        </h1>
      )}
      {!isContentArray && isValidStringBody && <p>{trimmedContent}</p>}

      {isContentArray && isValidStringBody && (
        <ul className="pl-10">
          {trimmedContent.map((item, index) => (
            <li className="list-disc" key={index}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobIDText;
