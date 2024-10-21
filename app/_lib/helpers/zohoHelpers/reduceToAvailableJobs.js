/**
 * Filters applicants' data to include only those corresponding to available jobs.
 *
 * This function takes a list of available job IDs and a dataset of applicants, returning an object that only includes applicants for jobs that are in the available jobs list.
 *
 * @function reduceToAvailableJobs
 * @param {Array<string>} availableJobs - An array of available job IDs.
 * @param {Object} applicantsData - An object where keys are job IDs and values are arrays of applicants for each job.
 * @returns {Object} - A new object containing only the applicants for jobs that are available.
 *
 * @example
 * const availableJobs = ['job1', 'job3'];
 * const applicantsData = {
 *   job1: [{ name: 'John Doe' }],
 *   job2: [{ name: 'Jane Smith' }],
 *   job3: [{ name: 'Alex Johnson' }],
 * };
 * const result = reduceToAvailableJobs(availableJobs, applicantsData);
 * console.log(result);
 * Output: { job1: [{ name: 'John Doe' }], job3: [{ name: 'Alex Johnson' }] }
 */

function reduceToAvailableJobs(availableJobs, applicantsData) {
  return Object.keys(applicantsData).reduce((acc, key) => {
    const isValidJob = availableJobs.includes(key);
    if (isValidJob) acc[key] = applicantsData[key];
    return acc;
  }, {});
}

export default reduceToAvailableJobs;
