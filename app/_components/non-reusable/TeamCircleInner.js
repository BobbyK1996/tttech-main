import React from 'react';
import Image from 'next/image';

import { FaLinkedin } from 'react-icons/fa';

import { convertToHttps } from '@lib/helperShared';

function TeamCircleInner({ activeIndex, employee }) {
  return (
    <div
      className={`absolute z-10 w-full h-full duration-300 ${
        activeIndex !== employee.id ? 'scale-0' : 'scale-75'
      }`}
    >
      <div className="relative z-20 w-full h-full overflow-hidden rounded-full">
        <div className="relative w-full h-full">
          <Image
            src={employee.image}
            alt={employee.name}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute z-30 flex flex-col items-center justify-center w-full h-full gap-3 duration-300 -translate-x-1/2 translate-y-1/2 opacity-0 hover:opacity-70 bottom-1/2 left-1/2 text-slate-200 bg-primary-800 rounded-t-3xl">
          <h2 className="flex flex-col items-center justify-center text-2xl sm:text-4xl md:text-xl lg:text-4xl">
            <span>{employee.name}</span>
            <span className="text-base sm:text-base">{employee.role}</span>
          </h2>
          <div className="text-3xl sm:text-5xl md:text-4xl lg:text-6xl">
            <a
              className="w-full h-full bg-black"
              href={convertToHttps(employee.url)}
              target="_blank"
              rel="noopener noreferrer"
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
