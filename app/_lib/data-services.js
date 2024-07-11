import { convertToObject } from '@lib/helper';
import supabase from '@lib/supabase';

export async function revalidateZoho() {
  try {
    const res = await fetch(
      `https://accounts.zoho.eu/oauth/v2/token?refresh_token=${process.env.REFRESH_TOKEN}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token`,
      {
        method: 'POST',
      }
    );

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const data = await res.json();

    const { access_token, expires_in } = data;

    console.log(data);

    return { access_token, expires_in };
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('id, title, category, salaryMin, salaryMax, location, tags');

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getJobsTest() {
  try {
    const { access_token } = await revalidateZoho();

    const res = await fetch(
      `https://recruit.zoho.eu/recruit/v2/Job_Openings/search?criteria=(${process.env.JOB_CRITERIA})`,
      {
        method: 'GET',
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
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
