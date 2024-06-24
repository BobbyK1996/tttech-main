import { formatNumber, formatToK } from '@lib/helper';
import Link from 'next/link';

import { IoBriefcaseOutline } from 'react-icons/io5';
import { RiMoneyPoundCircleLine } from 'react-icons/ri';

function JobCard({ jobs }) {
  const { title, salaryMin, salaryMax, location, tags } = jobs;
  return (
    <div className="grid grid-cols-3 px-8 py-6 transition duration-300 ease-in-out border-2 rounded-md border-primary-800 bg-primary-950 hover:scale-105 hover:border-white">
      <div className="grid grid-cols-[auto,1fr] col-span-2 grid-rows-[1fr,auto] gap-x-4 gap-y-2 p-2 text-xl font-bold place-items-start">
        <span className="p-1 text-3xl rounded-md bg-primary-700">
          <IoBriefcaseOutline />
        </span>
        <span className="flex items-center h-full">{title}</span>
        <span className="col-span-2 text-base text-primary-400">
          {location}
        </span>
      </div>

      <div className="flex items-center gap-3 text-xl">
        <div className="text-3xl text-primary-400">
          <RiMoneyPoundCircleLine />
        </div>
        <div>
          <span className="font-bold">
            £{formatToK(salaryMin)} - £{formatToK(salaryMax)}
          </span>
          <span className="text-xs"> /Month</span>
        </div>
      </div>

      <div className="flex items-center col-span-2 gap-2 pl-2">
        {tags.map((tag) => (
          <span className="px-3 py-2 text-xs text-center rounded-md bg-slate-700">
            {tag}
          </span>
        ))}
      </div>

      <Link
        href="/"
        className="w-full px-6 py-4 text-center transition duration-300 ease-in-out rounded-md hover:bg-accent-600 bg-slate-500"
      >
        Apply
      </Link>
    </div>
  );
}

export default JobCard;
