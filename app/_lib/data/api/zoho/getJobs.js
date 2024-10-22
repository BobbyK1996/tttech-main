/**
 * Fetches job openings from the Zoho Recruit API and stores a backup of the data.
 * If the API call fails, it attempts to retrieve cached job data from the database.
 *
 * @async
 * @function getJobs
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of job data objects either from the Zoho API or from cached backup data.
 * @throws {Error} If both the API request and fetching the cached backup data fail.
 *
 * @example
 * const jobs = await getJobs();
 * console.log(jobs); // Logs the job data retrieved from the API or from backup.
 */

import {
  revalidateZoho,
  saveBackupJobData,
  getBackupJobData,
} from '@data/index';

async function getJobs() {
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
    console.log('Res.ok:', res.ok);

    if (!res.ok) {
      const { code: errorCode, message: errorMessage } = await res.json();

      if (errorCode === 'INVALID_TOKEN')
        throw new Error(`The OAuth token is invalid. Please reauthenticate.`);

      throw new Error(`Error: ${errorCode}. Details: ${errorMessage}`);
    }

    const { data } = await res.json();

    console.log('from getjobs:', data);

    const dataBackupResult = await saveBackupJobData('jobsBackup', data);

    if (!dataBackupResult.success) {
      console.error('Failed to save backup data:', dataBackupResult.error);
    } else {
      console.log('Backup data saved successfully');
    }

    return data;
  } catch (error) {
    console.error(`Error fetching jobs getJobs: ${error.message}`);

    const backupData = await getBackupJobData('jobsBackup', 'jobs');
    if (!backupData) {
      throw new Error('No cached data available and API request failed');
    }

    return backupData;
  }
}

export default getJobs;
