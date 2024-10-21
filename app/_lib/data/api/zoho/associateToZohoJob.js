import { generateAssociateBodyData } from '@helpers/index';

async function associateToZohoJob(jobsToCandidates, access_token) {
  const statusCodes = await Promise.all(
    Object.entries(jobsToCandidates).map(async ([jobId, applicantIds]) => {
      const bodyData = generateAssociateBodyData(jobId, applicantIds);

      const res = await fetch(
        'https://recruit.zoho.eu/recruit/v2/Candidates/actions/associate',
        {
          method: 'PUT',
          headers: {
            Authorization: `Zoho-oauthtoken ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
          redirect: 'follow',
        },
      );

      return res.status;
    }),
  );

  return statusCodes;
}

export default associateToZohoJob;
