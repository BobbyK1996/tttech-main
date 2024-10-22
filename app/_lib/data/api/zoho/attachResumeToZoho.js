/**
 * Attaches a resume to a Zoho candidate record using the Zoho Recruit API.
 * If the same attachment URL is already present for the specified category, it will not modify the record.
 * Otherwise, a new attachment record is added.
 *
 * @async
 * @function attachResumeToZoho
 * @param {Object} applicant - The applicant object containing Zoho ID, DB ID, email, and resume link.
 * @param {string} applicant.zohoId - The Zoho ID of the candidate.
 * @param {string} applicant.DBId - The database ID of the applicant.
 * @param {string} applicant.email - The applicant's email.
 * @param {string} applicant.resumeLink - The URL to the resume that needs to be attached.
 * @param {string} access_token - The OAuth token for authenticating the Zoho API request.
 * @param {string} [submissionCategory='WebsiteSubmission'] - The category under which the attachment should be submitted (default is 'WebsiteSubmission').
 * @returns {Promise<Object>} - A promise that resolves to the Zoho API response data, or throws an error if the request fails.
 * @throws {Error} If the API request fails or returns an unsuccessful result.
 *
 * @example
 * const applicant = {
 *   zohoId: '12345',
 *   DBId: '67890',
 *   email: 'applicant@example.com',
 *   resumeLink: 'https://example.com/resume.pdf',
 * };
 * const accessToken = 'your-access-token';
 *
 * try {
 *   const result = await attachResumeToZoho(applicant, accessToken);
 *   console.log('Resume attached successfully:', result);
 * } catch (error) {
 *   console.error('Error attaching resume:', error);
 * }
 */

async function attachResumeToZoho(
  applicant,
  access_token,
  submissionCategory = 'WebsiteSubmission',
) {
  //The Zoho API always returns 'SUCCESS' for non-unique categories like 'WebsiteSubmission'. If a file with the same `attachment_url` is already attached, it doesn't modify the record. If the `attachment_url` is different, it adds a new record. Therefore, ensure the third-party database only allows one entry per email, as email is the unique key in Zoho.

  const apiUrl = `https://recruit.zoho.eu/recruit/v2/Candidates/${applicant.zohoId}/Attachments?attachments_category=WebsiteSubmission`;

  const headers = {
    Authorization: `Zoho-oauthtoken ${access_token}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const attachmentName = `Resume - ${applicant.zohoId}`;

  // const body = `attachment_url=${encodeURIComponent(applicant.resumeLink)}`;
  const body = `attachment_url=${encodeURIComponent(applicant.resumeLink)}&attachment_name=${encodeURIComponent(attachmentName)}`;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    const [result] = data?.data || [];

    if (result?.code !== 'SUCCESS')
      throw new Error(
        `API error: ${result?.message} - ${JSON.stringify(result?.details)} `,
      );

    // console.log('API Response:', { fullData: data, details: result.details });

    return data;
  } catch (error) {
    console.error(`Error during upload for applicant ${applicant.zohoId}:`, {
      applicant: {
        zohoId: applicant.zohoId,
        dbId: applicant.DBId,
        email: applicant.email,
        resumeLink: applicant.resumeLink,
        submissionCategory,
      },
      error: error.message || error,
      stack: error.stack,
    });
    throw error;
  }
}

export default attachResumeToZoho;
