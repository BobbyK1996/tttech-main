/**
 * Creates and submits entries for verified and unsubmitted candidates to the Zoho Recruit API.
 * This is an orchestration function that orchestrates the process of fetching candidate data, sorting, filtering and uploading it to Zoho, including attaching resumes.
 *
 * @async
 * @function createZohoEntry
 * @returns {Promise<voidfornow>} - A promise that resolves when the process of creating Zoho entries for candidates is complete. If no candidates are available or if an error occurs, the function exits early.
 *
 * @throws {Error} If an error occurs during any of the processing steps, including database access or API requests.
 *
 * @example
 * await createZohoEntry();
 * This will process the candidates and submit their data to Zoho.
 */

import {
  getVerifiedUnsubmittedCandidates,
  sortApplicantsByJob,
  getCurrentJobIds,
  reduceToAvailableJobs,
  revalidateZoho,
  upsertCandidatesToZoho,
  associateToZohoJob,
  matchZohoToDB,
  attachBatchResumeToZoho,
} from '@data/index';

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
