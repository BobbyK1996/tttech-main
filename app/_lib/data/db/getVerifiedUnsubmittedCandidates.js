/**
 * Retrieves candidates from the Supabase database who are verified but have not yet been submitted.
 *
 * This function queries the `tempResume` table for candidates where the `verified` field is true
 * and the `submitted` field is false. It will throw an error if there is a problem with the query or if an unexpected error occurs during the process.
 *
 * @async
 * @function getVerifiedUnsubmittedCandidates
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of candidate objects that are verified and unsubmitted.
 * @throws {Error} Throws an error if there is a problem retrieving candidates from the Supabase database.
 *
 * @example
 * try {
 *   const candidates = await getVerifiedUnsubmittedCandidates();
 *   console.log('Verified and unsubmitted candidates:', candidates);
 * } catch (error) {
 *   console.error('Error fetching candidates:', error.message);
 * }
 */

import supabase from '@lib/supabase';

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

export default getVerifiedUnsubmittedCandidates;
