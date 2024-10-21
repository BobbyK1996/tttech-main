/**
 * Generates the body data for associating applicants with a job in Zoho Recruit.
 *
 * Formats the data required to associate multiple applicants with a specific job ID, including a comment field.
 *
 * @function generateAssociateBodyData
 * @param {string} jobId - The ID of the job to associate applicants with.
 * @param {Array<string>} applicantIds - An array of applicant IDs to be associated with the job.
 * @returns {Object} - Formatted data for the association operation.
 *
 * @example
 * const bodyData = generateAssociateBodyData('12345', ['applicant1', 'applicant2']);
 * console.log(bodyData);
 */

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

export default generateAssociateBodyData;
