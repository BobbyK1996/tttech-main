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
  const {
    id,
    created_date,
    title,
    salaryMin,
    salaryMax,
    location,
    tags,
    jobDescription,
  } = TEMP_DATA;
  // const job = await getJob(params.jobId);

  const titleSplit = title.split(' ');
  const lastWord = titleSplit.pop();
  const titleWithoutLastWord = titleSplit.join(' ');

  return (
    <div className="grid max-w-6xl grid-cols-[1fr,16rem] mx-auto mt-8 gap-4 gap-y-16 p-2 place-items-start grid-rows-[auto,1fr] h-full">
      <div className="grid grid-cols-[auto,1fr] gap-3 ">
        <h1 className="col-span-2 font-bold text-7xl">
          {titleWithoutLastWord}{' '}
          <span className="text-accent-500">{lastWord}</span>
        </h1>
        <h2 className="col-span-2 pl-2 text-xl font-semibold">{location}</h2>
        <div className="flex gap-4 place-items-start">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 border rounded-xl border-primary-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-end">{salaryMin}</div>
      </div>

      <div className="flex justify-center w-full h-full">test</div>

      <div className="flex flex-col gap-8 text-lg text-primary-50">
        <div>
          <h1 className="inline-block mb-4 text-4xl border-b border-primary-200 text-accent-300">
            About Us
          </h1>
          <p>{jobDescription.about}</p>
        </div>
        <div>
          <h1 className="inline-block mb-4 text-3xl border-b border-primary-200 text-accent-300">
            Overview
          </h1>
          <p>{jobDescription.overview}</p>
        </div>
        <div>
          <h1 className="inline-block mb-4 text-3xl border-b border-primary-200 text-accent-300">
            Responsibilities
          </h1>
          <ul className="pl-10">
            {jobDescription.responsibilities.map((res, index) => (
              <li className="list-disc" key={index}>
                {res}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="inline-block mb-4 text-3xl border-b border-primary-200 text-accent-300">
            Requirements
          </h1>
          <ul className="pl-10">
            {jobDescription.requirements.map((req, index) => (
              <li className="list-disc" key={index}>
                {req}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="inline-block mb-4 text-3xl border-b border-primary-200 text-accent-300">
            Benefits
          </h1>
          <ul className="pl-10">
            {jobDescription.benefits.map((benefit, index) => (
              <li className="list-disc" key={index}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <p>{jobDescription.ending}</p>

        <p className="text-slate-400">
          [Company Name] is an equal opportunity employer. We celebrate
          diversity and are committed to creating an inclusive environment for
          all employees.
        </p>
      </div>
    </div>
  );
}

export default Page;
