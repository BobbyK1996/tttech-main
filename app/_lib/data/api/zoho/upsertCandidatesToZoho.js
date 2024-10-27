/**
 * Upserts candidates to Zoho Recruit for each job and returns a mapping of job IDs to candidate IDs.
 *
 * This function takes an object of applicants sorted by job ID and upserts the candidates to Zoho Recruit's API.
 * It sends a POST request to the Zoho Recruit "Candidates upsert" endpoint for each job, and returns an object mapping job IDs to the corresponding upserted candidate IDs.
 *
 * @async
 * @function upsertCandidatesToZoho
 * @param {Object} sortedFilteredApplicants - An object where keys are job IDs and values are arrays of applicants.
 * @param {string} access_token - The OAuth access token used to authenticate the request to Zoho Recruit's API.
 * @returns {Promise<Object>} - A promise that resolves to an object mapping job IDs to arrays of upserted candidate IDs.
 *
 * @throws {Error} If the request to Zoho Recruit's API fails or returns an error.
 *
 * @example
 * const sortedApplicants = {
 *   job1: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
 *   job2: [{ name: 'Alex Johnson' }],
 * };
 * const accessToken = 'your_oauth_token';
 *
 * const candidateIdsToJobId = await upsertCandidatesToZoho(sortedApplicants, accessToken);
 * console.log(candidateIdsToJobId);
 * Output: { job1: ['candidateId1', 'candidateId2'], job2: ['candidateId3'] }
 */

import { generateUpsertBodyData } from '@helpers/indexServer';

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

export default upsertCandidatesToZoho;
