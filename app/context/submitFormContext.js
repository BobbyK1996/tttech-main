import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';

import { initialState, reducer } from '@lib/reducers/submitFormReducer';
import { VALID_FILE_TYPES } from '@lib/data';
import {
  isValidEmail,
  isValidJobTitle,
  isValidMessage,
  isValidName,
  isValidPhoneNumber,
  isValidUrl,
  validateFile,
} from '@lib/helperShared';

const SubmitFormContext = createContext();

function SubmitFormProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validators = useMemo(
    () => ({
      required: {
        givenName: isValidName,
        surname: isValidName,
        number: isValidPhoneNumber,
        email: isValidEmail,
        resumeFile: validateFile,
      },
      optional: {
        currentJobTitle: isValidJobTitle,
        linkedinLink: (value) => isValidUrl(value, true),
        portfolioLink: isValidUrl,
        message: isValidMessage,
      },
    }),
    [],
  );

  const formItemStyles = useMemo(() => {
    return 'block w-full p-3 text-white duration-700 ease-in-out border-gray-300 rounded-sm shadow-sm hover:bg-primary-500 placeholder-slate-400 hover:placeholder-white focus:outline-none active:color-slate-500';
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      let processedValue = value;

      if (name === 'number') processedValue = value.replace(/[^0-9+]/g, '');

      const isValidPrimitive =
        typeof processedValue === 'string' || processedValue === null;

      if (isValidPrimitive) {
        dispatch({
          type: 'SET_FORM_DATA',
          payload: {
            name,
            value: processedValue,
          },
        });
      } else {
        console.error(`${name} should be a valid primitive`);
      }
    },
    [dispatch],
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;

      const trimmedValue = typeof value === 'string' ? value.trim() : null;

      dispatch({
        type: 'SET_FORM_DATA',
        payload: {
          name,
          value: trimmedValue,
        },
      });
    },
    [dispatch],
  );

  const handleFileChange = useCallback(
    (file) => {
      const isValidFile = validators.required.resumeFile(
        file,
        VALID_FILE_TYPES,
      );

      dispatch({
        type: 'SET_FORM_DATA',
        payload: {
          name: 'resumeFile',
          value: isValidFile.status ? file : null,
        },
      });

      dispatch({
        type: 'SET_FORM_DATA',
        payload: {
          name: 'resumeFileError',
          value: isValidFile,
        },
      });
    },
    [dispatch],
  );

  return (
    <SubmitFormContext.Provider
      value={{
        state,
        dispatch,
        handleChange,
        handleBlur,
        handleFileChange,
        validators,
        formItemStyles,
      }}
    >
      {children}
    </SubmitFormContext.Provider>
  );
}

function useSubmitForm() {
  const context = useContext(SubmitFormContext);

  if (context === undefined)
    throw new Error('Context was used outside provider');

  return context;
}

export { SubmitFormProvider, useSubmitForm };
