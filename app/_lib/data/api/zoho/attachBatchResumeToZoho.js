/**
 * Attaches resumes for a batch of matched applicants to their respective Zoho candidate records using the Zoho Recruit API.
 * The function processes applicants in batches to manage API concurrent request limits effectively.
 *
 * @async
 * @function attachBatchResumeToZoho
 * @param {Object} matchedApplicants - An object mapping job IDs to their respective applicant records.
 * @param {Array<Object>} matchedApplicants.[jobId] - An array of applicants for a specific job ID.
 * @param {string} matchedApplicants.[jobId].zohoId - The Zoho ID of the candidate.
 * @param {string} matchedApplicants.[jobId].DBId - The database ID of the applicant.
 * @param {string} matchedApplicants.[jobId].email - The applicant's email.
 * @param {string} matchedApplicants.[jobId].resumeLink - The URL to the resume that needs to be attached.
 * @param {string} access_token - The OAuth token for authenticating the Zoho API request.
 * @param {number} [batchSize=8] - The number of applicants to process in each batch (default is 8).
 * @param {string} [submissionCategory='Website Submission'] - The category under which the attachment should be submitted (default is 'Website Submission').
 * @returns {Promise<void>} - A promise that resolves when all batches have been processed successfully.
 * @throws {Error} If the API request fails for any applicant in the batch.
 *
 * @example
 * const matchedApplicants = {
 *   'jobId1': [
 *     { zohoId: '123', DBId: 'abc', email: 'applicant1@example.com', resumeLink: 'https://example.com/resume1.pdf' },
 *     { zohoId: '456', DBId: 'def', email: 'applicant2@example.com', resumeLink: 'https://example.com/resume2.pdf' },
 *   ],
 *   More job IDs and their respective applicants...
 * };
 * const accessToken = 'your-access-token';
 *
 * await attachBatchResumeToZoho(matchedApplicants, accessToken);
 * console.log('All resumes attached successfully');
 */

import { revalidateZoho, attachResumeToZoho } from '@data/indexServer';
import { isTokenValid } from '@lib/helperShared';

async function attachBatchResumeToZoho(
  matchedApplicants,
  { access_token, expiration_time },
  batchSize = 8,
  submissionCategory = 'Website Submission',
) {
  const applicants = Object.values(matchedApplicants).flat();

  let validToken = access_token;
  let validExpiry = expiration_time;

  const batches = Array.from(
    { length: Math.ceil(applicants.length / batchSize) },
    (_, i) => applicants.slice(i * batchSize, i * batchSize + batchSize),
  );

  for (const batch of batches) {
    if (!isTokenValid(validExpiry)) {
      const tokenResponse = await revalidateZoho();
      validToken = tokenResponse.access_token;
      validExpiry = tokenResponse.expiration_time;
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

export default attachBatchResumeToZoho;
