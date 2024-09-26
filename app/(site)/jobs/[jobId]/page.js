import { FaCalendar } from 'react-icons/fa';

import { getJob } from '@lib/data-services';
import { convertToObject, formatDate } from '@lib/helper';

import Salary from '@components/reusable/Salary';
import JobIDText from '@/app/_components/reusable/JobIDText';

async function Page({ params }) {
  const job = await getJob(params.jobId);
  const {
    Job_Opening_ID: id,
    Created_Time: created_date,
    Posting_Title: title,
    Salary: salary,
    City: location = 'Remote',
    Associated_Tags: tags,
    PublicDescription: jobDescription,
  } = job;

  const descriptionObject = convertToObject([jobDescription]);

  const titleSplit = title.split(' ');
  const lastWord = titleSplit.pop();
  const titleWithoutLastWord = titleSplit.join(' ');

  return (
    <div className="grid max-w-6xl grid-cols-1 md:grid-cols-[1fr,16rem] mx-auto mt-8 gap-4 gap-y-16 p-2 place-items-start grid-rows-[auto,1fr] h-full">
      <div className="grid grid-cols-[auto,1fr] gap-3 w-full">
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

        <Salary salary={salary} />

        <div className="flex col-span-2 gap-4 text-sm text-slate-400">
          <span>Job Reference #{id.toString().padStart(4, '0')}</span>
          <span className="flex items-center gap-1">
            <FaCalendar />
            <span>Posted on {formatDate(created_date)}</span>
          </span>
        </div>
      </div>

      <div className="flex justify-center w-full h-full">Apply!</div>

      <div className="flex flex-col w-full gap-8 text-lg text-primary-50">
        <JobIDText header="About Us">{descriptionObject.about}</JobIDText>

        <JobIDText header="Overview">{descriptionObject.overview}</JobIDText>

        <JobIDText header="Responsibilities">
          {descriptionObject.responsibilities}
        </JobIDText>

        <JobIDText header="Requirements">
          {descriptionObject.requirements}
        </JobIDText>

        <JobIDText header="Benefits">{descriptionObject.benefits}</JobIDText>

        <p>{descriptionObject.ending}</p>

        <p className="text-sm text-slate-400">
          [Company Name] is an equal opportunity employer. We celebrate
          diversity and are committed to creating an inclusive environment for
          all employees.
        </p>
      </div>
    </div>
  );
}

export default Page;
