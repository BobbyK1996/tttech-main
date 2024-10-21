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
    return { access_token: ACCESS_TOKEN, expiration_time: EXPIRATION_TIME };
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

    return { access_token: ACCESS_TOKEN, expiration_time: EXPIRATION_TIME };
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
    return { access_token: ACCESS_TOKEN, expiration_time: EXPIRATION_TIME };
  } finally {
    refreshingPromise = null;
  }
}

async function saveBackupJobData(key, data) {
  const jobIdArray = data.reduce((acc, job) => {
    acc.push(job.id);
    return acc;
  }, []);
  console.log('From saveBackupJobData:', jobIdArray);

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

async function getBackupJobData(key, column) {
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

    const dataBackupResult = await saveBackupJobData('jobsBackup', data);

    if (!dataBackupResult.success) {
      console.error('Failed to save backup data:', dataBackupResult.error);
    } else {
      console.log('Backup data saved successfully');
    }

    return data;
  } catch (error) {
    console.error(`Error fetching jobs: ${error.message}`);

    const backupData = await getBackupJobData('jobsBackup', 'jobs');
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

    console.log('Response Data:', responseData);
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

      return res.status;
    }),
  );

  return statusCodes;
}

function matchZohoToDB(applicantsDB, zohoIds) {
  const matchedEntries = Object.entries(applicantsDB).reduce(
    (acc, [jobId, applicants]) => {
      const candidateIds = zohoIds[jobId];

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

async function attachResumeToZoho(
  applicant,
  access_token,
  submissionCategory = 'WebsiteSubmission',
) {
  //The Zoho API always returns 'SUCCESS' for non-unique categories like 'WebsiteSubmission'. If a file with the same `attachment_url` is already attached, it doesn't modify the record. If the `attachment_url` is different, it adds a new record. Therefore, ensure the third-party database only allows one entry per email, as email is the unique key in Zoho.

  const apiUrl = `https://recruit.zoho.eu/recruit/v2/Candidates/${applicant.zohoId}/Attachments?attachments_category=${submissionCategory}`;

  const headers = {
    Authorization: `Zoho-oauthtoken ${access_token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body = `attachment_url=${encodeURIComponent(applicant.resumeLink)}`;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    const [result] = data?.data || [];

    if (result?.code !== 'SUCCESS')
      throw new Error(
        `API error: ${result?.message} - ${JSON.stringify(result?.details)} `,
      );

    console.log('API Response:', { fullData: data, details: result.details });

    return data;
  } catch (error) {
    console.error(`Error during upload for applicant ${applicant.zohoId}:`, {
      applicant: {
        zohoId: applicant.zohoId,
        dbId: applicant.DBId,
        email: applicant.email,
        resumeLink: applicant.resumeLink,
        submissionCategory,
      },
      error: error.message || error,
      stack: error.stack,
    });
    throw error;
  }
}

async function attachBatchResumeToZoho(
  matchedApplicants,
  access_token,
  batchSize = 8,
  submissionCategory = 'Website Submission',
) {
  const applicants = Object.values(matchedApplicants).flat();

  let validToken = access_token;

  const batches = Array.from(
    { length: Math.ceil(applicants.length / batchSize) },
    (_, i) => applicants.slice(i * batchSize, i * batchSize + batchSize),
  );

  for (const batch of batches) {
    if (!isTokenValid(EXPIRATION_TIME)) {
      const tokenResponse = await revalidateZoho();
      validToken = tokenResponse.access_token;
    }

    const promiseResults = await Promise.allSettled(
      batch.map((applicant) =>
        attachResumeToZoho(applicant, validToken, submissionCategory),
      ),
    );

    promiseResults.map((result, index) => {
      if (result.status === 'rejected')
        console.error(
          `Error processing applicant ${batch[index].zohoId}: ${result.reason}}`,
        );
    });
  }

  console.log('Batches processed successfully');
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

    console.log(
      'Sorted & Filtered candidates, ready for submission:',
      sortedFilteredApplicants,
    );

    //Upsert validated & unsubmitted candidate profiles to Zoho
    const { access_token } = await revalidateZoho();

    const zohoCandidateIdsToJobId = await upsertCandidatesToZoho(
      sortedFilteredApplicants,
      access_token,
    );

    //Associate the candidate to the job applied for.
    const statusCodesAssociate = await associateToZohoJob(
      zohoCandidateIdsToJobId,
      access_token,
    );

    //The index of the ids returned should match sortedFilteredApplicants
    const zohoIdsToDBCandidateData = matchZohoToDB(
      sortedFilteredApplicants,
      zohoCandidateIdsToJobId,
    );

    console.log(
      'Zoho IDs matched to DB IDs & Applied Job(s):',
      zohoIdsToDBCandidateData,
    );

    //Submit the resume to the correct candidate profile
    await attachBatchResumeToZoho(zohoIdsToDBCandidateData, access_token, 6);
  } catch (error) {
    console.error('Error creating Zoho entry:', error);
    return;
  }
}
