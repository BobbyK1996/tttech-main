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
  const jobIdArray = data.reduce((acc, job) => {
    acc.push(job.id);
    return acc;
  }, []);
  console.log('From saveBackupData:', jobIdArray);

  const { data: result, error } = await supabase
    .from(key)
    .update({ jobs: data, jobIds: jobIdArray })
    .eq('id', 1)
    .select();

  if (error) {
    console.error(error);
    return { success: false, error };
  }

  return { success: true, data: result };
}

async function getBackupData(key, column) {
  const { data, error } = await supabase.from(key).select(column);

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

export async function createApplicantEntryDB(formData) {
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
    idPath,
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
      jobId: idPath,
      verified: false,
      submitted: false,
    },
  ]);

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

async function getVerifiedUnsubmittedCandidates() {
  try {
    const { data, error } = await supabase
      .from('tempResume')
      .select('*')
      .match({ verified: true, submitted: false });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Could not get candidates eligible for submission');
    }

    return data;
  } catch (error) {
    console.error('Unexpected error connecting to Supabase:', error);
    throw error;
  }
}

async function getCurrentJobIds() {
  try {
    const { data, error } = await supabase
      .from('jobsBackup')
      // .eq('id', 1)
      .select('jobIds');

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Could not get current job ID list');
    }

    if (!data || data.length === 0) return [];

    return data[0].jobIds;
  } catch (error) {
    console.error('Unexpected error connecting to Supabase:', error);
    throw error;
  }
}

function sortApplicantsByJob(applicantData) {
  const sortedApplicants = applicantData.reduce((acc, app) => {
    if (!acc[app.jobId]) acc[app.jobId] = [];

    acc[app.jobId].push(app);
    return acc;
  }, {});

  return sortedApplicants;
}

function reduceToAvailableJobs(availableJobs, applicantsData) {
  return Object.keys(applicantsData).reduce((acc, key) => {
    const isValidJob = availableJobs.includes(key);
    if (isValidJob) acc[key] = applicantsData[key];
    return acc;
  }, {});
}

async function upsertCandidatesToZoho(sortedFilteredApplicants, access_token) {
  const candidateIdsToJobId = await Object.entries(
    sortedFilteredApplicants,
  ).reduce(async (accPromise, [jobId, applicants]) => {
    const acc = await accPromise;

    const bodyData = generateUpsertBodyData(applicants);

    const res = await fetch(
      'https://recruit.zoho.eu/recruit/v2/Candidates/upsert',
      {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      },
    );

    const responseData = await res.json();

    // console.log('Response Data:', responseData);
    const candidateIds = responseData.data.map(
      (candidate) => candidate.details.id,
    );

    acc[jobId] = candidateIds;

    return acc;
  }, Promise.resolve({}));

  return candidateIdsToJobId;
}

function generateUpsertBodyData(applicants) {
  const upsertApplicantData = applicants.map((applicant) => {
    return {
      Email: applicant.email,
      Origin: 'Applied',
      First_Name: applicant.givenName,
      Last_Name: applicant.surname,
      Full_Name: `${applicant.givenName} ${applicant.surname}`,
      Phone: applicant.number,
      Current_Job_Title: applicant.currentJobTitle,
      LinkedIn__s: 'https://www.linkedin.com/in/johnsmith1234',
      Website: applicant.portfolioLink,
    };
  });

  const upsertData = {
    data: upsertApplicantData,
    duplicate_check_fields: ['Email'],
  };

  // console.log('Upsert Data:', upsertData);

  return upsertData;
}

function generateAssociateBodyData(jobId, applicantIds) {
  return {
    data: [
      {
        jobids: [jobId],
        ids: applicantIds,
        comments: 'Record successfully associated',
      },
    ],
  };
}

async function associateToZohoJob(jobsToCandidates, access_token) {
  const statusCodes = await Promise.all(
    Object.entries(jobsToCandidates).map(async ([jobId, applicantIds]) => {
      const bodyData = generateAssociateBodyData(jobId, applicantIds);

      const res = await fetch(
        'https://recruit.zoho.eu/recruit/v2/Candidates/actions/associate',
        {
          method: 'PUT',
          headers: {
            Authorization: `Zoho-oauthtoken ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
          redirect: 'follow',
        },
      );

      const responseText = await res.text();
      console.log('res:', responseText);

      return res.status;
    }),
  );

  return statusCodes;
}

function matchZohoToDB(applicantsDB, zohoIds) {
  const matchedEntries = Object.entries(applicantsDB).reduce(
    (acc, [jobId, applicants]) => {
      candidateIds = zohoIds[jobId];

      if (
        candidateIds &&
        applicants &&
        candidateIds.length === applicants.length
      ) {
        const matchedData = applicants.map((applicant, index) => ({
          zohoId: candidateIds[index],
          DBId: applicant.id,
          email: applicant.email,
          resumeLink: applicant.resumeLink,
        }));

        return {
          ...acc,
          [jobId]: matchedData,
        };
      } else {
        console.error(`Mismatch or missing data for jobId: ${jobId}`);
        return acc;
      }
    },
    {},
  );

  return matchedEntries;
}

export async function createZohoEntry() {
  try {
    // Get applicantData from database
    const applicantsToSubmit = await getVerifiedUnsubmittedCandidates();
    if (applicantsToSubmit?.length === 0) return;

    //Sort the data by jobId
    const sortedApplicants = sortApplicantsByJob(applicantsToSubmit);

    //Get the current job Ids
    const currentJobIds = await getCurrentJobIds();
    if (!currentJobIds || currentJobIds.length === 0) return;

    //Filter applicants by available jobs
    const sortedFilteredApplicants = reduceToAvailableJobs(
      currentJobIds,
      sortedApplicants,
    );

    //Upsert validated & unsubmitted candidate profiles to Zoho
    const { access_token } = await revalidateZoho();

    console.log('Access token before Zcitjd:', access_token);

    const zohoCandidateIdsToJobId = await upsertCandidatesToZoho(
      sortedFilteredApplicants,
      access_token,
    );

    //Associate the candidate to the job applied for.
    const statusCodes = await associateToZohoJob(
      zohoCandidateIdsToJobId,
      access_token,
    );

    console.log('Candidates IDs to Job IDs:', zohoCandidateIdsToJobId);

    console.log('statusCodes after associating:', statusCodes);

    //the index of the ids returned should be the same as sortedFilteredApplicants
    // const zohoIdsToSupabaseCandidateData = matchZohoToDB(
    //   sortedFilteredApplicants,
    //   zohoCandidateIdsToJobId,
    // );
  } catch (error) {
    console.error('Error creating Zoho entry:', error);
    return;
  }
}

const sortedFilteredApplicants = {
  '31464000003635007': [
    {
      id: 9,
      email: 'johnsmith@smith.com',
      resumeLink:
        'https://supabase.co/storage/v1/object/public/CVs/283270b4-4e6c-4c67-813e-68acd4cfdfa2-1728945385355',
      verificationToken:
        'fbfd0592b162cf70f318b5ae9e38921fca1223f72127e258e67c13b874c1e9bd',
      tokenExpiry: '2024-10-14T22:51:26.015+00:00',
      givenName: 'John',
      number: '01111111111',
      currentJobTitle: 'JohnSmithsJob',
      surname: 'Smith',
      linkedinLink: '/in/johnsmith',
      portfolioLink: 'www.website.com',
      verified: true,
      submitted: false,
      jobId: '31464000003635007',
    },
    {
      id: 10,
      email: 'johnsmith2@smith.com',
      resumeLink:
        'https://supabase.co/storage/v1/object/public/CVs/283270b4-4e6c-4c67-813e-68acd4cfdfa2-1728945385355',
      verificationToken:
        'fbfd0592b162cf70f287b5ae9e38921fca1223f72127e258e67c13b874c1e9bd',
      tokenExpiry: '2024-10-14T22:51:26.015+00:00',
      givenName: 'Johno',
      number: '01111111112',
      currentJobTitle: 'JohnSmithsJob2',
      surname: 'Smitho',
      linkedinLink: '/in/johnosmitho',
      portfolioLink: 'www.website.com',
      verified: true,
      submitted: false,
      jobId: '31464000003635007',
    },
  ],
};
