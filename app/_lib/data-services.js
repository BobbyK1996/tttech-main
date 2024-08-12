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

    return { access_token, expires_in };
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

async function saveBackupData(key, data) {
  const { data: result, error } = await supabase
    .from(key)
    .update({ jobs: data })
    .eq('id', 1)
    .select();

  if (error) {
    console.error(error);
    return { success: false, error };
  }

  return { success: true, data: result };
}

async function getBackupData(key, column) {
  const { data, error } = await supabase.from(key).eq('id', 1).select(column);

  const dataObject = data.map((dataString) => JSON.parse(dataString));

  if (error) {
    console.error('Error getting backup data from database', error);
  }

  return dataObject;
}

export async function getJobs() {
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

    const { data } = await res.json();

    const dataBackupResult = await saveBackupData('jobsBackup', data);

    if (!dataBackupResult.success) {
      console.error('Failed to save backup data:', dataBackupResult.error);
    } else {
      console.log('Backup data saved successfully');
    }

    return data;
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);

    const backupData = await getBackupData('jobsBackup', 'jobs');
    if (!backupData) {
      throw new Error('No cached data available and API request failed');
    }

    return backupData;
  }
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('adminSettings')
    .select('categories');

  if (error) {
    console.error(error);
  }

  const categories = convertToObject(data);

  console.log(categories);

  return categories;
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
