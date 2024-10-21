/**
 * Generates the body data for upserting candidates to Zoho Recruit.
 *
 * Maps applicant data into the format required by Zoho Recruit for the upsert operation.
 * Ensures duplicates are checked based on the 'Email' field.
 *
 * @function generateUpsertBodyData
 * @param {Array<Object>} applicants - Array of applicant objects.
 * @returns {Object} - Formatted data for the upsert operation.
 *
 * @example
 * const bodyData = generateUpsertBodyData(applicants);
 * console.log(bodyData);
 */

function generateUpsertBodyData(applicants) {
  const upsertApplicantData = applicants.map((applicant) => {
    return {
      Email: applicant.email,
      Origin: 'Applied',
      First_Name: applicant.givenName,
      Last_Name: applicant.surname,
      Full_Name: `${applicant.givenName} ${applicant.surname}`,
      Phone: applicant.number,
      Current_Job_Title: applicant.currentJobTitle,
      LinkedIn__s: 'https://www.linkedin.com/in/johnsmith1234',
      Website: applicant.portfolioLink,
    };
  });

  const upsertData = {
    data: upsertApplicantData,
    duplicate_check_fields: ['Email'],
  };

  // console.log('Upsert Data:', upsertData);

  return upsertData;
}

export default generateUpsertBodyData;
