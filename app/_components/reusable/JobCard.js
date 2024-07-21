import Link from 'next/link';

import { IoBriefcaseOutline } from 'react-icons/io5';
import { RiMoneyPoundCircleLine } from 'react-icons/ri';

import { formatToK, validateSalaryString } from '@lib/helper';

function JobCard({ job }) {
  // console.log(job);
  const {
    Posting_Title: title,
    Salary: salary,
    City: location = 'Remote',
    Associated_Tags: tags,
    Job_Opening_ID: id,
  } = job;

  const salaryMin =
    validateSalaryString(salary) !== 0
      ? Number(validateString(salary).split('-')[0].trim())
      : 0;
  const salaryMax =
    validateSalaryString(salary) !== 0
      ? Number(validateString(salary).split('-')[1].trim())
      : 0;

  // const salaryMin = Number(salary.split('-')[0]);
  // const salaryMax =  Number(salary.split('-')[1]);

  return (
    <div className="grid grid-cols-3 px-8 py-6 transition duration-300 ease-in-out border-2 rounded-md border-primary-900 bg-primary-950 hover:scale-105 hover:border-white hover:shadow-2xl filter">
      <div className="grid grid-cols-[auto,1fr] col-span-2 grid-rows-[1fr,auto] gap-x-4 gap-y-2 p-2 text-xl font-bold place-items-start">
        <span className="p-1 text-3xl rounded-md bg-primary-800">
          <IoBriefcaseOutline />
        </span>
        <span className="flex items-center h-full">{title}</span>
        <span className="col-span-2 text-base text-primary-400">
          {location}
        </span>
      </div>

      <div className="flex items-center justify-end gap-3 text-xl">
        <div className="text-3xl text-primary-400">
          <RiMoneyPoundCircleLine />
        </div>
        <div>
          <span className="font-bold">
            £{formatToK(salaryMin)} - £{formatToK(salaryMax)}
          </span>
          <span className="text-xs"> /year</span>
        </div>
      </div>

      <div className="flex items-center col-span-2 gap-2 pl-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-2 text-xs text-center rounded-md bg-accent-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/jobs/${id}`}
        className="w-full px-6 py-4 text-center transition duration-300 ease-in-out rounded-md hover:bg-accent-300 bg-accent-500"
      >
        Apply
      </Link>
    </div>
  );
}

export default JobCard;
