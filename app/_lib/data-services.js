import { convertToObject } from '@lib/helper';
import supabase from '@lib/supabase';

let refreshingPromise = null;

let REFRESH_TOKEN = process.env.REFRESH_TOKEN;
let ACCESS_TOKEN = null;
let EXPIRATION_TIME = null;

const TOKEN_EXPIRATION_BUFFER = 300 * 1000;

export async function revalidateZoho() {
  if (refreshingPromise) {
    await refreshingPromise;
    return { access_token: ACCESS_TOKEN };
  }

  try {
    // returns cached token if it's still valid on this server instance
    if (ACCESS_TOKEN && EXPIRATION_TIME && Date.now() < EXPIRATION_TIME) {
      console.log('Updated from cache');
      return { access_token: ACCESS_TOKEN };
    }

    //if no cached token on server instance, checks the db to see if any other instance hs created a new token
    const { data: dbTokenData, error: dbError } = await supabase
      .from('zohoAuthToken')
      .select('*')
      .limit(1);

    if (dbError)
      throw new Error(`Database query for token failed: ${dbError.message}`);

    if (dbTokenData && dbTokenData.length > 0) {
      const { token: dbToken, expiration_time: dbExpiration } = dbTokenData[0];
      if (dbToken && Date.now() < new Date(dbExpiration).getTime()) {
        ACCESS_TOKEN = dbToken;
        EXPIRATION_TIME = new Date(dbExpiration).getTime();
        console.log('Updated from DB');

        return { access_token: ACCESS_TOKEN };
      }
    }

    //if no valid token from either this server instance or from the database, generate a new token
    refreshingPromise = (async () => {
      const params = new URLSearchParams({
        refresh_token: REFRESH_TOKEN,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
      });

      const res = await fetch(
        `https://accounts.zoho.eu/oauth/v2/token?${params.toString()}`,
        {
          method: 'POST',
        }
      );

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      const { access_token, expires_in } = await res.json();

      const expirationTime =
        Date.now() + expires_in * 1000 - TOKEN_EXPIRATION_BUFFER;
      const expirationTimeISO = new Date(expirationTime).toISOString();

      //update db with new token data
      const { error: updateError } = await supabase
        .from('zohoAuthToken')
        .update({ token: access_token, expiration_time: expirationTimeISO })
        .eq('id', 1);

      if (updateError)
        throw new Error(
          `Failed to update database with token: ${updateError.message}`
        );

      //save the token and expiration date in cached memory
      ACCESS_TOKEN = access_token;
      EXPIRATION_TIME = expirationTime;

      console.log('Updated from API');
      return ACCESS_TOKEN;
    })();

    await refreshingPromise;
    return { access_token: ACCESS_TOKEN };
  } catch (error) {
    throw new Error(`Error. Failed to refresh access token: ${error.message}`);
  } finally {
    refreshingPromise = null;
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

// export async function getJobTemp(id){
//   try {
//     const {access_token} = await revalidateZoho();
//   }
// }
