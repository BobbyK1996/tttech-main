/**
 * Retrieves the categories from the 'adminSettings' table in Supabase and converts them to an object format.
 *
 * @async
 * @function getCategories
 * @returns {Promise<Object>} - A promise that resolves to the categories object retrieved from the database.
 * @throws {Error} Logs an error to the console if there's an issue with the database query.
 *
 * @example
 * const categories = await getCategories();
 * console.log(categories); // Logs the categories object.
 */

import supabase from '@lib/supabase';
import { convertToObject } from '@helpers/indexServer';

async function getCategories() {
  const { data, error } = await supabase
    .from('adminSettings')
    .select('categories');

  if (error) {
    console.error(error);
  }

  const categories = convertToObject(data);

  return categories;
}

export default getCategories;
