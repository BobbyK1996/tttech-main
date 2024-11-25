'use client';
import { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';

import Salary from '@components/reusable/Salary';
import JobIDText from '@components/reusable/JobIDText';
import SubmitFormWrapper from '@components/reusable/SubmitFormWrapper';
import Fade from '@components/reusable/Fade';

import { formatDate } from '@helpers/indexServer';

function JobPageClientWrapper({ job, utils }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();

    setIsOpen((prevState) => !prevState);
  };

  const {
    id,
    jobOpeningID,
    created_date,
    salary,
    location,
    tags,
    descriptionObject,
  } = job;

  const { lastWord, titleWithoutLastWord } = utils;

  return (
    <div className='mx-auto mt-8 flex h-full max-w-6xl flex-col place-items-start gap-4 gap-y-16 p-2'>
      <div className='flex w-full flex-col gap-3'>
        <h1 className='text-5xl font-bold sm:text-7xl md:text-8xl'>
          {titleWithoutLastWord}{' '}
          <span className='text-accent-500'>{lastWord}</span>
        </h1>
        <h2 className='col-span-2 pl-2 text-xl font-semibold'>{location}</h2>
        <div className='flex flex-wrap items-center gap-4'>
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className='rounded-xl px-2 py-1 shadow-lg hover:saturate-100 hover:filter'
              style={{
                backgroundColor: `${tag.color_code}`,
              }}
            >
              {tag.name}
            </span>
          ))}

          <Salary salary={salary} customCSS='justify-start' />
        </div>

        <div className='col-span-2 flex gap-4 text-sm text-slate-400'>
          <span>Job Reference #{jobOpeningID}</span>
          <span className='flex items-center gap-1'>
            <FaCalendar />
            <span>Posted on {formatDate(created_date)}</span>
          </span>
        </div>
      </div>

      <Fade in={!isOpen} unmountOnExit>
        <div className='flex w-full flex-col gap-8 text-lg text-primary-50'>
          <JobIDText header='About Us'>{descriptionObject.about}</JobIDText>

          <JobIDText header='Overview'>{descriptionObject.overview}</JobIDText>

          <JobIDText header='Responsibilities'>
            {descriptionObject.responsibilities}
          </JobIDText>

          <JobIDText header='Requirements'>
            {descriptionObject.requirements}
          </JobIDText>

          <JobIDText header='Benefits'>{descriptionObject.benefits}</JobIDText>

          <JobIDText>{descriptionObject.ending}</JobIDText>

          <p className='text-sm text-slate-400'>
            [Company Name] is an equal opportunity employer. We celebrate
            diversity and are committed to creating an inclusive environment for
            all employees.
          </p>
        </div>
      </Fade>

      <div className='-z-0 flex w-full justify-center shadow-2xl'>
        <SubmitFormWrapper isOpen={isOpen} onOpen={handleOpen} />
      </div>
    </div>
  );
}

export default JobPageClientWrapper;
