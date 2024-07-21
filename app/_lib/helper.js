export function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

export function formatToK(number) {
  if (number >= 1000) {
    return (number / 1000).toFixed(0) + 'k';
  }
  return number.toString();
}

export function convertToObject(data, index = 0) {
  try {
    const categories = data[index].categories.map((categoryString) => {
      const jsonString = categoryString
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":');
      return JSON.parse(jsonString);
    });

    console.log(categories);
    return categories;
  } catch (error) {
    console.error('Error parsing categories:', error);
    return null;
  }
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

export function validateSalaryString(s) {
  if (typeof s !== 'string') {
    return 0;
  }

  const pattern = /^(\d+)\s*-\s*(\d+)$/;

  const match = s.match(pattern);

  if (match) {
    const [_, x, y] = match;

    const numX = parseInt(x, 10);
    const numY = parseInt(y, 10);

    if (!isNaN(numX) && !isNaN(numY)) {
      return s;
    }
  }

  return 0;
}
