'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import TeamCirclePerson from '@components/non-reusable/TeamCirclePerson';
import TeamCircleCenter from '@components/non-reusable/TeamCircleCenter';

const breakpoints = [
  { max: 450, size: '3rem', multiplier: 0.54 },
  { min: 451, max: 639, size: '5rem', multiplier: 0.555 },
  { min: 640, max: 767, size: '7rem', multiplier: 0.52 },
  { min: 768, max: 999, size: '5rem', multiplier: 0.5 },
  { min: 1000, max: 1199, size: '7rem', multiplier: 0.52 },
  { min: 1200, size: '9rem', multiplier: 0.53 },
];

const getConfig = (width) => {
  return breakpoints.find(
    ({ min = -Infinity, max = Infinity }) => width >= min && width <= max
  );
};

function TeamCircle({ employeeArray }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const parentRef = useRef(null);

  const updateTransformOrigin = useCallback(() => {
    if (!parentRef.current) return;

    const parentWidth = parentRef.current.clientWidth;
    const elements = parentRef.current.querySelectorAll('.rotate-i');
    const windowWidth = window.innerWidth;

    const { size: elementSize, multiplier: originMultiplier } =
      getConfig(windowWidth);

    elements.forEach((element) => {
      element.style.transitionDuration = '0s';

      element.style.width = elementSize;
      element.style.height = elementSize;

      const originValue = `${parentWidth * originMultiplier}px`;
      element.style.transformOrigin = originValue + ' center';

      setTimeout(() => {
        element.style.transitionDuration = '0.2s';
      }, 50);
    });
  }, []);

  useEffect(() => {
    updateTransformOrigin();

    window.addEventListener('resize', updateTransformOrigin);

    return () => {
      window.removeEventListener('resize', updateTransformOrigin);
    };
  }, [updateTransformOrigin]);

  const handleClick = useCallback((i) => {
    setActiveIndex(i);
  }, []);

  return (
    <div
      className="flex items-center justify-center flex-1 p-2 sm:p-10 basis-7/12"
      ref={parentRef}
    >
      <div className="relative w-full border-2 border-white rounded-full squareAspectRatio">
        <div className="relative z-10 flex items-center justify-center w-full h-full -left-1/2">
          {employeeArray.map((employee, i) => (
            <TeamCirclePerson
              employee={employee}
              key={i}
              index={i}
              isActive={activeIndex === i}
              onClick={() => handleClick(i)}
            />
          ))}
        </div>
        <TeamCircleCenter
          employeeArray={employeeArray}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  );
}

export default TeamCircle;
