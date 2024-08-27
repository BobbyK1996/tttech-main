'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import bobbyMin from '@/public/bobby-min.jpg';
import TeamCirclePerson from './TeamCirclePerson';

const employeeArray = [
  {
    name: 'Trishna',
    image: bobbyMin,
    role: 'CEO',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto assumenda veritatis nostrum qui libero quaerat temporibus ratione corporis, provident recusandae consectetur! Vel asperiores maiores ab eius quod veniam iusto voluptas?',
  },
  {
    name: 'Trishna',
    image: bobbyMin,
    role: 'CEO',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto assumenda veritatis nostrum qui libero quaerat temporibus ratione corporis, provident recusandae consectetur! Vel asperiores maiores ab eius quod veniam iusto voluptas?',
  },
  {
    name: 'Trishna',
    image: bobbyMin,
    role: 'CEO',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto assumenda veritatis nostrum qui libero quaerat temporibus ratione corporis, provident recusandae consectetur! Vel asperiores maiores ab eius quod veniam iusto voluptas?',
  },
  {
    name: 'Trishna',
    image: bobbyMin,
    role: 'CEO',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto assumenda veritatis nostrum qui libero quaerat temporibus ratione corporis, provident recusandae consectetur! Vel asperiores maiores ab eius quod veniam iusto voluptas?',
  },
  {
    name: 'Trishna',
    image: bobbyMin,
    role: 'CEO',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto assumenda veritatis nostrum qui libero quaerat temporibus ratione corporis, provident recusandae consectetur! Vel asperiores maiores ab eius quod veniam iusto voluptas?',
  },
  {
    name: 'Trishna',
    image: bobbyMin,
    role: 'CEO',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto assumenda veritatis nostrum qui libero quaerat temporibus ratione corporis, provident recusandae consectetur! Vel asperiores maiores ab eius quod veniam iusto voluptas?',
  },
  {
    name: 'Trishna',
    image: bobbyMin,
    role: 'CEO',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto assumenda veritatis nostrum qui libero quaerat temporibus ratione corporis, provident recusandae consectetur! Vel asperiores maiores ab eius quod veniam iusto voluptas?',
  },
];

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

function TeamCircle() {
  const [activeIndex, setActiveIndex] = useState(1);
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
        element.style.transitionDuration = '0.1s';
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
        <div className="absolute overflow-hidden inset-8 sm:inset-16 md:inset-14 before:content-[''] before:absolute before:inset-0 before:border-4 before:border-transparent before:border-l-primary-400 before:border-r-accent-400 before:rounded-full before:teamsSpinnerRight after:content-[''] after:absolute after:inset-4 after:border-4 after:border-transparent after:border-l-primary-400 after:border-r-accent-400 after:rounded-full after:teamsSpinnerLeft"></div>
      </div>
    </div>
  );
}

export default TeamCircle;
