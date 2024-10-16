export const initialState = {
  formData: {
    givenName: '',
    surname: '',
    number: '',
    email: '',
    resumeFile: undefined,
    resumeFileError: { status: false },
    currentJobTitle: '',
    linkedinLink: '',
    portfolioLink: '',
    message: '',
  },
  idPath: '',
  recaptchaToken: null,
  isSubmitting: false,
  sendStatus: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'SET_RECAPTCHA_TOKEN':
      return {
        ...state,
        recaptchaToken: action.payload,
      };
    case 'SET_URL':
      return {
        ...state,
        idPath: action.payload,
      };
    case 'SET_IS_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case 'SET_SEND_STATUS':
      return {
        ...state,
        sendStatus: action.payload,
      };
    case 'RESET_FORM':
      return {
        ...state,
        formData: {
          givenName: '',
          surname: '',
          number: '',
          email: '',
          resumeFile: null,
          currentJobTitle: '',
          linkedinLink: '',
          portfolioLink: '',
          message: '',
        },
        recaptchaToken: null,
      };
    default:
      return state;
  }
};
