function isInputField(target) {
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'BUTTON'
  );
}

export default isInputField;
