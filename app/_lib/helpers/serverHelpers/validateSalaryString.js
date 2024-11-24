function validateSalaryString(s) {
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

export default validateSalaryString;
