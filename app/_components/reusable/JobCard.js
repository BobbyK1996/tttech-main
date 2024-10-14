import Link from 'next/link';

import { IoBriefcaseOutline } from 'react-icons/io5';

import Salary from '@components/reusable/Salary';

function JobCard({ job }) {
  const {
    Posting_Title: title,
    Salary: salary,
    City: location = 'Remote',
    Associated_Tags: tags,
    Job_Opening_ID: jobOpeningID,
    id: digitID,
  } = job;

  const id = `${jobOpeningID}-${digitID}`;

  console.log('This is the ID:', id);

  return (
    <div className='grid grid-cols-3 rounded-md border-2 border-primary-900 bg-primary-950 px-8 py-6 filter transition duration-300 ease-in-out hover:scale-105 hover:border-white hover:shadow-2xl'>
      <div className='col-span-2 grid grid-cols-[auto,1fr] grid-rows-[1fr,auto] place-items-start gap-x-4 gap-y-2 p-2 text-xl font-bold'>
        <span className='rounded-md bg-primary-800 p-1 text-3xl'>
          <IoBriefcaseOutline />
        </span>
        <span className='flex h-full items-center'>{title}</span>
        <span className='col-span-2 text-base text-primary-400'>
          {location}
        </span>
      </div>

      <Salary salary={salary} />

      <div className='col-span-2 flex items-center gap-2 pl-2'>
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag.id}
            className='rounded-xl px-4 py-2 shadow-lg hover:saturate-100 hover:filter'
            style={{
              backgroundColor: `${tag.color_code}`,
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>

      <Link
        href={`/jobs/${id}`}
        className='w-full rounded-md bg-accent-500 px-6 py-4 text-center transition duration-300 ease-in-out hover:bg-accent-300'
      >
        Apply
      </Link>
    </div>
  );
}

export default JobCard;
