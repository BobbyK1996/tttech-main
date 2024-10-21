/**
 * Fetches a specific job by its ID from the Zoho Recruit API. Validates the ID before making the request.
 * Handles token validation and any potential errors during the process, including fallback for invalid tokens.
 *
 * @async
 * @function getJob
 * @param {string} id - The ID of the job to be fetched.
 * @returns {Promise<Object>} - A promise that resolves to the job data object.
 * @throws {Error} If the Job ID is invalid, the OAuth token is invalid, or the request to the API fails.
 *
 * @example
 * const {data} = await getJob('1234567890');
 * console.log(data); // Logs the job data retrieved from Zoho API.
 */

import { revalidateZoho } from '@data/index';

import { validateString } from '@lib/helperShared';

async function getJob(id) {
  try {
    const isValidID = validateString(id, 'ID');

    if (!isValidID)
      throw new Error('The Job ID is empty. Please provide a valid Job ID');

    const { access_token } = await revalidateZoho();
    const res = await fetch(
      `https://recruit.zoho.eu/recruit/v2/Job_Openings/${id})`,
      {
        method: 'GET',
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
        next: { revalidate: 86400 },
      },
    );

    if (!res.status === 204) return { notFound: true, resStatus: res.status };

    if (!res.ok) {
      const { code: errorCode, message: errorMessage } = await res.json();

      if (errorCode === 'INVALID_TOKEN')
        throw new Error(`The OAuth token is invalid. Please reauthenticate.`);

      throw new Error(`Error: ${errorCode}. Details: ${errorMessage}`);
    }

    const { data } = await res.json();

    if (!data || data.length === 0)
      return { notFound: true, resStatus: res.status };

    // return data[0];
    return {
      data: data[0],
      resStatus: res.status,
    };
  } catch (error) {
    throw new Error(`Error fetching jobs: ${error.message}`);
  }
}

export default getJob;
