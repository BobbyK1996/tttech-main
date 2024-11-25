import React from 'react';
import Image from 'next/image';

import { FaLinkedin } from 'react-icons/fa';

// import { convertToHttps } from '@helpers/indexShared';
import { convertToHttps } from '@helpers/indexShared';

function TeamCircleInner({ activeIndex, employee }) {
  return (
    <div
      className={`absolute z-10 h-full w-full duration-300 ${
        activeIndex !== employee.id ? 'scale-0' : 'scale-75'
      }`}
    >
      <div className='relative z-20 h-full w-full overflow-hidden rounded-full'>
        <div className='relative h-full w-full'>
          <Image
            src={employee.image}
            alt={employee.name}
            fill
            sizes='50vw'
            className='object-cover'
          />
        </div>
        <div className='absolute bottom-1/2 left-1/2 z-30 flex h-full w-full -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center gap-3 rounded-t-3xl bg-primary-800 text-slate-200 opacity-0 duration-300 hover:opacity-70'>
          <h2 className='flex flex-col items-center justify-center text-2xl sm:text-4xl md:text-xl lg:text-4xl'>
            <span>{employee.name}</span>
            <span className='text-base sm:text-base'>{employee.role}</span>
          </h2>
          <div className='text-3xl sm:text-5xl md:text-4xl lg:text-6xl'>
            <a
              className='h-full w-full bg-black'
              href={convertToHttps(employee.url)}
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TeamCircleInner);
