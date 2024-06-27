export function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

export function formatToK(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k';
  }
  return number.toString();
}

export function convertToObject(str) {
  if (typeof str !== 'string') throw new Error('INPUT MUST BE A STRING');

  const jsonString = str.replace(/'/g, '"').replace(/(\w+):/g, '"$1":');

  return JSON.parse(jsonString);
}

export function formatDate(inputDate) {
  const dateObj = new Date(inputDate);
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth();
  const year = dateObj.getFullYear();

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[monthIndex];

  return `${day} ${month} ${year}`;
}
