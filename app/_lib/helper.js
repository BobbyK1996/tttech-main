export function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

export function formatToK(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k';
  }
  return number.toString();
}
