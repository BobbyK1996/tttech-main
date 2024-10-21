import { notFound } from 'next/navigation';

import JobPageClientWrapper from '@components/non-reusable/JobPageClientWrapper';
import { getJob, createZohoEntry } from '@data/index';
import { convertToObject, formatDate } from '@lib/helper';

const TEMP_DATA = {
  Client_Name: { name: 'TTTechSolutionsLtd', id: '31464000000284047' },
  $currency_symbol: '£',
  isInterviewRequired: false,
  Posting_Title: 'TestJob (API)',
  source: null,
  Account_Manager: { name: 'TrishnaThakrar', id: '31464000000211003' },
  feeArrangement: null,
  Target_Date: null,
  Required_Skills: null,
  taxStatus: null,
  Last_Activity_Time: '2024-09-26T17:59:52+01:00',
  Industry: 'devdesign',
  $state: 'save',
  $process_flow: false,
  Zip_Code: null,
  id: '31464000003635007',
  $approved: true,
  Date_Opened: '2024-07-06',
  durationWeeks: null,
  $approval: {
    delegate: false,
    approve: false,
    reject: false,
    resubmit: false,
  },
  Remote_Job: true,
  Created_Time: '2024-07-06T21:04:27+01:00',
  $followed: false,
  $editable: true,
  Is_Locked: false,
  City: null,
  Job_Opening_Status: 'In-progress',
  Associated_Tags: [
    { name: 'Remote', id: '31464000003881008', color_code: '#57B1FD' },
    { name: 'Development', id: '31464000003881006', color_code: '#F48435' },
    { name: 'Fulltime', id: '31464000003881004', color_code: '#879BFC' },
  ],
  Assigned_Recruiter: [
    {
      name: 'BobbyKamal',
      id: '31464000000211911',
      email: 'bobby@tttechrec.com',
      photoSrc: 'https://contacts.zoho.eu/file?ID=20071072376&fs=thumb',
    },
  ],
  Work_Experience: null,
  isOpen: true,
  Job_Type: 'Fulltime',
  Job_Opening_Name: 'TestJob(API)',
  Number_of_Positions: '1',
  State: null,
  Country: null,
  Created_By: { name: 'BobbyKamal', id: '31464000000211911' },
  Is_Attachment_Present: false,
  Keep_on_Career_Site: false,
  Salary: '10000-20000',
  Assigned_Recruiters: [
    {
      name: 'BobbyKamal',
      id: '31464000000211911',
      email: 'bobby@tttechrec.com',
      photoSrc: 'https://contacts.zoho.eu/file?ID=20071072376&fs=thumb',
    },
  ],
  No_of_Candidates_Hired: 0,
  dateClientInterview: null,
  Modified_By: { name: 'BobbyKamal', id: '31464000000211911' },
  Expected_Revenue: null,
  Is_Hot_Job_Opening: true,
  onSite: null,
  Publish: false,
  Modified_Time: '2024-09-25T23:43:51+01:00',
  Actual_Revenue: null,
  hoursPerWeek: null,
  address: null,
  employmentType: null,
  No_of_Candidates_Associated: 0,
  PublicDescription: {
    about:
      '[Company Name] is a dynamic and innovative tech company specializing in [brief description of the company’s industry and what it does]. We pride ourselves on delivering top-notch solutions and exceptional service to our clients. We are looking for a skilled JavaScript Engineer to join our growing team.',
    ending:
      'Interested candidates are invited to submit their resume, a cover letter, and a portfolio or links to their work to [application email or application portal link].',
    benefits: [
      'Competitive salary and benefits package.',
      'Flexible working hours and remote work options.',
      'Opportunity to work with a passionate and talented team.',
      'Continuous learning and professional development opportunities.',
      'Collaborative and inclusive work environment.',
      'Health and wellness programs.',
    ],
    overview:
      'As a JavaScript Engineer at [Company Name], you will be responsible for developing and implementing complex web applications using JavaScript. You will work closely with our product, design, and backend teams to build efficient, scalable, and user-friendly applications. Your expertise in JavaScript, along with modern frameworks and libraries, will be critical in shaping the user experience and driving the success of our projects.',
    requirements: [
      'Experience with server-side JavaScript using Node.js.',
      'Knowledge of TypeScript.',
      'Familiarity with state management libraries like Redux or MobX.',
      'Understanding of CI/CD pipelines and deployment processes.',
      'Experience with testing frameworks such as Jest, Mocha, or Cypress.',
      'Knowledge of web security practices and principles.',
    ],
    responsibilities: [
      'Develop and maintain high-quality web applications using JavaScript, HTML, and CSS.',
      'Collaborate with UX/UI designers to implement design specifications into functional web interfaces.',
      'Work with backend developers to integrate frontend components with server-side logic.',
      'Optimize applications for maximum speed and scalability.',
      'Ensure the technical feasibility of UI/UX designs.',
      'Write clean, maintainable, and well-documented code.',
      'Conduct code reviews and provide constructive feedback to peers.',
      'Stay updated with the latest industry trends, technologies, and best practices.',
      'Troubleshoot and debug issues in a timely manner.',
    ],
  },
  Revenue_per_Position: null,
  Contact_Name: { name: 'BobbyKamal', id: '31464000000401361' },
  salaryUnit: null,
  Missed_Revenue: null,
  Job_Opening_ID: 'ZR_496_JOB',
  Job_Description: null,
  $approval_state: 'approved',
};

async function Page({ params }) {
  const zohoId = params.jobId.split('-')[1];
  // await createZohoEntry();

  try {
    const { data: job, resStatus, notFound: isNotFound } = await getJob(zohoId);

    if (isNotFound) {
      notFound();
      return;
    }

    // const job = TEMP_DATA;
    const {
      Job_Opening_ID: jobOpeningID,
      id: digitID,
      Created_Time: created_date,
      Posting_Title: title,
      Salary: salary,
      City: location = 'Remote',
      Associated_Tags: tags,
      PublicDescription: jobDescription,
    } = job;

    const id = `${jobOpeningID}-${digitID}`;

    // const descriptionObject = convertToObject([jobDescription]);
    const descriptionObject = jobDescription;

    const titleSplit = title.split(' ');
    const lastWord = titleSplit.pop();
    const titleWithoutLastWord = titleSplit.join(' ');

    return (
      <JobPageClientWrapper
        job={{
          id,
          jobOpeningID,
          created_date,
          title,
          salary,
          location,
          tags,
          descriptionObject,
        }}
        utils={{ titleSplit, lastWord, titleWithoutLastWord }}
      />
    );
  } catch (err) {
    notFound();
    return;
  }
}

export default Page;
