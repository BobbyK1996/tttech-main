/**
 * Matches applicants from the database with their corresponding Zoho IDs.
 *
 * Takes applicant data from the database and Zoho candidate IDs, and returns a structured object that links Zoho IDs with database IDs, emails, and resume links for each job.
 *
 * @function matchZohoToDB
 * @param {Object} applicantsDB - An object where each key is a job ID and the value is an array of applicants.
 * @param {Object} zohoIds - An object where each key is a job ID and the value is an array of Zoho candidate IDs.
 * @returns {Object} - An object that maps job IDs to an array of matched data containing Zoho ID, DB ID, email, and resume link.
 *
 * @example
 * const matchedData = matchZohoToDB(applicantsDB, zohoIds);
 * console.log(matchedData);
 */

function matchZohoToDB(applicantsDB, zohoIds) {
  const matchedEntries = Object.entries(applicantsDB).reduce(
    (acc, [jobId, applicants]) => {
      const candidateIds = zohoIds[jobId];

      if (
        candidateIds &&
        applicants &&
        candidateIds.length === applicants.length
      ) {
        const matchedData = applicants.map((applicant, index) => ({
          zohoId: candidateIds[index],
          DBId: applicant.id,
          email: applicant.email,
          resumeLink: applicant.resumeLink,
        }));

        return {
          ...acc,
          [jobId]: matchedData,
        };
      } else {
        console.error(`Mismatch or missing data for jobId: ${jobId}`);
        return acc;
      }
    },
    {},
  );

  return matchedEntries;
}

export default matchZohoToDB;
