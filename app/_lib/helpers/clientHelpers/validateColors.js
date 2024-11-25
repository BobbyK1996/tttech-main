function validateColors(colors = {}) {
  if (typeof colors !== 'object' || colors === null || Array.isArray(colors))
    throw new Error('Please return an object for colors');

  const {
    defaultBackground,
    hoverBackground,
    hoverText,
    defaultText,
    currentNavColor,
  } = colors;

  if (
    ![
      defaultBackground,
      hoverBackground,
      hoverText,
      defaultText,
      currentNavColor,
    ].every((color) => typeof color === 'string')
  ) {
    throw new Error(
      "All color properties must be strings in the form of 'hover:bg-' or 'bg-' or 'hover:text-' or 'text-'",
    );
  }
}

export default validateColors;
