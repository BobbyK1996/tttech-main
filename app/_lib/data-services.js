import { convertToObject } from '@lib/helper';
import supabase from '@lib/supabase';

export async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('id, title, category, salaryMin, salaryMax, location, tags');

  if (error) {
    console.error(error);
  }

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

export async function getJob(id) {
  const { data, error } = await supabase
    .from('jobs')
    .select(
      'id, created_date, title, salaryMin, salaryMax, location, tags, jobDescription'
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}
