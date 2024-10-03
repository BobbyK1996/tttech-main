import { createContext, useContext, useReducer } from 'react';

import { initialState, reducer } from '@lib/reducers/submitFormReducer';

const SubmitFormContext = createContext();

function SubmitFormProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SubmitFormContext.Provider value={{ state, dispatch }}>
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
