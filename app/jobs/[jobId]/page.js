import { getJob } from '@lib/data-services';

const TEMP_DATA = {
  id: 1,
  created_date: '2024-06-26',
  title: 'JavaScript Engineer',
  salaryMin: 30000,
  salaryMax: 70000,
  location: 'Remote',
  tags: ['Fulltime', 'Hybrid', 'Development'],
  jobDescription: {
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
};

async function Page({ params }) {
  const job = await getJob(params.jobId);
  console.log(job);
  return <div className="max-w-6xl">hello</div>;
}

export default Page;
