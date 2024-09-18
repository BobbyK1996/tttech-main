export const initialState = {
  formData: {
    name: '',
    email: '',
    type: 'Company',
    message: '',
  },
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
          name: '',
          email: '',
          type: 'Company',
          message: '',
        },
        recaptchaToken: null,
      };
    default:
      return state;
  }
};
