import { convertToObject } from './helper';
import supabase from './supabase';

export async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('id, title, category, salaryMin, salaryMax, location, tags');

  if (error) {
    console.error(error);
  }

  console.log(data);

  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('adminSettings')
    .select('id, categories');

  if (error) {
    console.error(error);
  }

  const dataJSONified = data[0].categories.map(convertToObject);

  return dataJSONified;
}
