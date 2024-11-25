function validateLinksArray(linksArray) {
  if (!Array.isArray(linksArray) || linksArray.length === 0)
    throw new Error(
      'linksArray not present. Please include to use this component',
    );

  linksArray.forEach(({ name, address }) => {
    if (typeof name !== 'string' || typeof address !== 'string') {
      throw new Error(
        "Please provide a linksArray with valid values in the form of a string. The format for linksArray should be [{name: '', address: ''}]",
      );
    }
  });
}

export default validateLinksArray;
