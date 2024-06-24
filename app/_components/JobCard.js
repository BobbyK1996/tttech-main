import { formatNumber } from '@lib/helper';
import Link from 'next/link';

function JobCard({ jobs }) {
  const { title, salaryMin, salaryMax, location, technologies } = jobs;
  return (
    <Link
      href="/"
      className="flex transition duration-300 ease-in-out border-4 rounded-md border-primary-700 bg-primary-700 focus:outline-none hover:border-primary-300 hover:border-4 hover:scale-105"
    >
      <div className="flex-grow py-5 px-7">
        <h3 className="pb-3 text-2xl font-semibold border-b mc-3 text-accent-500 border-primary-200">
          {title}
        </h3>
        <p className="py-2 text-lg text-primary-200">
          Salary:{' '}
          <span className="font-bold">
            £{formatNumber(salaryMin)} - £{formatNumber(salaryMax)}
          </span>
        </p>
        <p className="py-2 text-lg text-primary-200">
          Location: <span className="font-bold">{location}</span>
        </p>
        <p className="py-2 text-lg text-primary-200">
          Technologies:{' '}
          <span className="font-bold">{technologies.sort().join(', ')}</span>
        </p>
      </div>
    </Link>
  );
}

export default JobCard;
