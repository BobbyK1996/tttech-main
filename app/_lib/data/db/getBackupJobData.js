/**
 * Retrieves backup job data from a specified Supabase table and parses it into JavaScript objects. Assumes that the data returned from the database is an array of strings, each of which can be parsed into an object.
 *
 * @async
 * @function getBackupJobData
 * @param {string} key - The name of the Supabase table from which to fetch data.
 * @param {string} column - The column(s) to select from the table, specified as a comma-separated string.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of job data objects parsed from JSON strings.
 * @throws {Error} If there is an error retrieving data from the Supabase database.
 *
 * @example
 * const jobs = await getBackupJobData('jobs_table', 'job_column');
 * console.log(jobs); // Logs the array of job data objects.
 */

import supabase from '@lib/supabase';

async function getBackupJobData(key, column) {
  // console.log('supabase from getBackup:', supabase);

  const { data, error } = await supabase.from(key).select(column);

  if (error) {
    console.error('Error getting backup data from database', error);
  }

  console.log(data);

  const jobs = data[0]?.jobs || [];

  const dataObject = jobs.map((jobsString) => JSON.parse(jobsString));

  return dataObject;
}

export default getBackupJobData;
