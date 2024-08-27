import Image from 'next/image';

import { FaLinkedin } from 'react-icons/fa';

function TeamCircleCenter({ employeeArray, isActive }) {
  return (
    <div className="absolute overflow-hidden inset-4 sm:inset-16 md:inset-14 before:content-[''] before:absolute before:inset-0 before:border-4 before:border-transparent before:border-l-primary-400 before:border-r-accent-400 before:rounded-full before:teamsSpinnerRight after:content-[''] after:absolute after:inset-4 after:border-4 after:border-transparent after:border-l-primary-400 after:border-r-accent-400 after:rounded-full after:teamsSpinnerLeft flex items-center justify-center">
      {employeeArray.map((employee, i) => {
        return (
          <div
            className={`absolute z-10 w-full h-full duration-300 ${
              isActive !== i ? 'scale-0' : 'scale-75'
            }`}
          >
            <div className="relative z-20 w-full h-full overflow-hidden rounded-full">
              <div className="relative w-full h-full">
                <Image
                  src={employee.image}
                  alt={employee.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute z-30 flex flex-col items-center justify-center w-full h-full gap-3 duration-300 -translate-x-1/2 translate-y-1/2 opacity-0 hover:opacity-70 bottom-1/2 left-1/2 text-slate-200 bg-primary-800 rounded-t-3xl">
                <h2 className="flex flex-col items-center justify-center text-2xl sm:text-4xl md:text-xl lg:text-4xl">
                  <span>{employee.name}</span>
                  <span className="text-base sm:text-base">
                    {employee.role}
                  </span>
                </h2>
                <div className="text-3xl sm:text-5xl md:text-4xl lg:text-6xl">
                  <a
                    className="w-full h-full bg-black"
                    href={`https://${employee.url.replace(/^https?:\/\//, '')}`}
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
      })}
    </div>
  );
}

export default TeamCircleCenter;
