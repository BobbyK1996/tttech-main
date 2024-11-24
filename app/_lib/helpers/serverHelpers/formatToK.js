function formatToK(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k';
  }
  return number.toString();
}

export default formatToK;
