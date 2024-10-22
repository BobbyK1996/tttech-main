/**
 * Saves backup data to the Supabase table.
 *
 * @param {string} key - The name of the table in Supabase.
 * @param {Array} data - The data to be saved (array of job objects).
 * @returns {Object} - Success state and either result data or error.
 */

import supabase from '@lib/supabase';

async function saveBackupJobData(key, data) {
  // console.log('supabase from saveBackup:', supabase);

  const jobIdArray = data.reduce((acc, job) => {
    acc.push(job.id);
    return acc;
  }, []);
  // console.log('From saveBackupJobData:', jobIdArray);

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

export default saveBackupJobData;
