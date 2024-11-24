import { validateObject } from '@helpers/indexShared';

function convertToObject(data, index = 0) {
  validateObject(data, 'data', 'The data parameter must be an array.');

  try {
    if (data[index].categories) {
      const categories = data[index].categories.map((categoryString) => {
        const jsonString = categoryString
          .replace(/'/g, '"')
          .replace(/(\w+):/g, '"$1":');
        return JSON.parse(jsonString);
      });

      return categories;
    } else {
      const jsonString = data[index]
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":');
      return JSON.parse(jsonString);
    }
  } catch (error) {
    console.error('Error parsing categories:', error);
    return null;
  }
}

export default convertToObject;
