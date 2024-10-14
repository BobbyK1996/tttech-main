import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

import supabase from '@lib/supabase';
import { convertToObject } from '@lib/helper';
import { validateString } from '@lib/helperShared';

let refreshingPromise = null;

let REFRESH_TOKEN = process.env.REFRESH_TOKEN;
let ACCESS_TOKEN = null;
let EXPIRATION_TIME = null;

const TOKEN_EXPIRATION_BUFFER = 300;

function isTokenValid(expirationTime) {
  return Date.now() < expirationTime;
}

function calculateExpirationTime(expires_in, buffer = 0) {
  return Date.now() + expires_in * 1000 - buffer * 1000;
}

export async function revalidateZoho() {
  if (refreshingPromise) {
    await refreshingPromise;
    return { access_token: ACCESS_TOKEN };
  }

  try {
    // returns cached token if it's still valid on this server instance
    if (ACCESS_TOKEN && EXPIRATION_TIME && Date.now() < EXPIRATION_TIME) {
      console.log('Token from cache');
    } else {
      //if no cached token on server instance, checks the db to see if any other instance hs created a new token
      const { data: dbTokenData, error: dbError } = await supabase
        .from('zohoAuthToken')
        .select('*')
        .limit(1);

      if (dbError)
        throw new Error(`Database query for token failed: ${dbError.message}`);
      console.log(dbTokenData);

      if (dbTokenData?.length > 0) {
        const { token, expiration_time } = dbTokenData[0];
        if (isTokenValid(new Date(expiration_time).getTime())) {
          ACCESS_TOKEN = token;
          EXPIRATION_TIME = new Date(expiration_time).getTime();
          console.log('Token from DB');
        } else {
          throw new Error('Token expired in DB; needs refresh');
        }
      } else {
        throw new Error('No token found in DB; needs refresh');
      }
    }

    return { access_token: ACCESS_TOKEN };
  } catch (error) {
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
        },
      );

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      const { access_token, expires_in } = await res.json();

      const expirationTime = calculateExpirationTime(
        expires_in,
        TOKEN_EXPIRATION_BUFFER,
      );
      const expirationTimeISO = new Date(expirationTime).toISOString();

      //update db with new token data
      const { error: updateError } = await supabase
        .from('zohoAuthToken')
        .update({ token: access_token, expiration_time: expirationTimeISO })
        .eq('id', 1);

      if (updateError)
        throw new Error(
          `Failed to update database with token: ${updateError.message}`,
        );

      //save the token and expiration date in cached memory
      ACCESS_TOKEN = access_token;
      EXPIRATION_TIME = expirationTime;

      console.log('Updated from API');
      return ACCESS_TOKEN;
    })();

    await refreshingPromise;
    return { access_token: ACCESS_TOKEN };
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
      },
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
  const isValidID = validateString(id, 'ID');

  if (!isValidID)
    throw new Error('The Job ID is empty. Please provide a valid Job ID');

  try {
    const { access_token } = await revalidateZoho();
    const res = await fetch(
      `https://recruit.zoho.eu/recruit/v2/Job_Openings/search?criteria=(Job_Opening_ID:equals:${id})`,
      {
        method: 'GET',
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
        next: { revalidate: 86400 },
      },
    );

    if (!res.ok) {
      const { code: errorCode, message: errorMessage } = await res.json();

      if (errorCode === 'INVALID_TOKEN')
        throw new Error(`The OAuth token is invalid. Please reauthenticate.`);

      throw new Error(`Error: ${errorCode}. Details: ${errorMessage}`);
    }

    const { data } = await res.json();

    if (!data || data.length === 0)
      throw new Error(`No data returned for the Job ID: ${id}`);

    return data[0];
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }
}

export async function createApplicantEntry(formData) {
  const {
    givenName,
    surname,
    number,
    email,
    resumeFile,
    currentJobTitle,
    linkedinLink,
    portfolioLink,
    message,
  } = formData;

  const resumePathName = `${uuidv4()}-${resumeFile.lastModified}`;
  const resumePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/CVs/${resumePathName}`;

  const token = randomBytes(32).toString('hex');

  const expirationTime = calculateExpirationTime(900);
  const expirationTimeISO = new Date(expirationTime).toISOString();

  const { data, error } = await supabase.from('tempResume').insert([
    {
      email,
      resumeLink: resumePath,
      givenName,
      number,
      currentJobTitle,
      surname,
      linkedinLink,
      portfolioLink,
      message,
      verificationToken: token,
      tokenExpiry: expirationTimeISO,
      verified: false,
      submitted: false,
    },
  ]);

  console.log('From tempResume', data);

  if (error) {
    console.error(error);
    throw new Error('Resume entry could not be created');
  }

  const { error: storageError } = await supabase.storage
    .from('CVs')
    .upload(resumePathName, resumeFile, {
      upsert: false,
    });

  if (storageError) {
    await supabase.from('tempResume').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Resume could not be uploaded and the Resume Entry was not created',
    );
  }
}

//1. create the resume entry
// const {data, error} = await supabase.from("tempResume").upsert([{associatedEmail: email, token: token } ], {
//   onConflict: ['associatedEmail']
// })
