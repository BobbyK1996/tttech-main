/**
 * Groups applicants by their associated job ID.
 *
 * This function takes an array of applicant data and organizes the applicants into an object, where each key is a job ID, and the value is an array of applicants for that job.
 *
 * @function sortApplicantsByJob
 * @param {Array<Object>} applicantData - Array of applicant objects, each containing a `jobId` field.
 * @returns {Object} - An object where keys are job IDs, and values are arrays of applicants.
 *
 * @example
 * const applicants = [
 *   { name: 'John Doe', jobId: 'job1' },
 *   { name: 'Jane Smith', jobId: 'job2' },
 *   { name: 'Alex Johnson', jobId: 'job1' },
 * ];
 * const sorted = sortApplicantsByJob(applicants);
 * console.log(sorted);
 * Output: { job1: [{...}, {...}], job2: [{...}] }
 */

function sortApplicantsByJob(applicantData) {
  const sortedApplicants = applicantData.reduce((acc, app) => {
    if (!acc[app.jobId]) acc[app.jobId] = [];

    acc[app.jobId].push(app);
    return acc;
  }, {});

  return sortedApplicants;
}

export default sortApplicantsByJob;
