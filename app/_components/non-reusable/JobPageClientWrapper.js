'use client';
import { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';

import Salary from '@components/reusable/Salary';
import JobIDText from '@components/reusable/JobIDText';
import SubmitFormWrapper from '@components/reusable/SubmitFormWrapper';
import Fade from '@components/reusable/Fade';

import { formatDate } from '@lib/helper';

function JobPageClientWrapper({ job, utils }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();

    setIsOpen((prevState) => !prevState);
  };

  const { id, created_date, salary, location, tags, descriptionObject } = job;

  const { lastWord, titleWithoutLastWord } = utils;

  return (
    <div className="flex flex-col h-full max-w-6xl gap-4 p-2 mx-auto mt-8 gap-y-16 place-items-start">
      <div className="grid grid-cols-[auto,1fr] gap-3 w-full">
        <h1 className="col-span-2 text-5xl font-bold sm:text-7xl">
          {titleWithoutLastWord}{' '}
          <span className="text-accent-500">{lastWord}</span>
        </h1>
        <h2 className="col-span-2 pl-2 text-xl font-semibold">{location}</h2>
        <div className="flex gap-4 place-items-start">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="px-4 py-2 shadow-lg rounded-xl hover:filter hover:saturate-100"
              style={{
                backgroundColor: `${tag.color_code}`,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>

        <Salary salary={salary} customCSS="justify-start" />

        <div className="flex col-span-2 gap-4 text-sm text-slate-400">
          <span>Job Reference #{id.toString().padStart(4, '0')}</span>
          <span className="flex items-center gap-1">
            <FaCalendar />
            <span>Posted on {formatDate(created_date)}</span>
          </span>
        </div>
      </div>

      <Fade in={!isOpen} unmountOnExit>
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

          <JobIDText>{descriptionObject.ending}</JobIDText>

          <p className="text-sm text-slate-400">
            [Company Name] is an equal opportunity employer. We celebrate
            diversity and are committed to creating an inclusive environment for
            all employees.
          </p>
        </div>
      </Fade>

      <div className="flex justify-center w-full bg-slate-400">
        <SubmitFormWrapper isOpen={isOpen} onOpen={handleOpen} />
      </div>
    </div>
  );
}

export default JobPageClientWrapper;
