/**
 * Retrieves the current job IDs from the `jobsBackup` table in Supabase.
 *
 * This function fetches the `jobIds` field from the `jobsBackup` table, which contains an array of job IDs. If no data is found or an error occurs, the function returns an empty array or throws an error respectively.
 *
 * @async
 * @function getCurrentJobIds
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of job IDs or an empty array if no data is found.
 * @throws {Error} If there is an error with the Supabase query or an unexpected error during the process.
 *
 * @example
 * try {
 *   const jobIds = await getCurrentJobIds();
 *   console.log('Current Job IDs:', jobIds);
 * } catch (error) {
 *   console.error('Error fetching job IDs:', error.message);
 * }
 */

import supabase from '@lib/supabase';

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

export default getCurrentJobIds;
