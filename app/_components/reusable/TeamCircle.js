'use client';

import { useEffect, useRef, useState } from 'react';

import trishnaMin from '@/public/trishna-min.jpg';
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

function TeamCircle() {
  const [activeIndex, setActiveIndex] = useState(1);
  const parentRef = useRef(null);

  const updateTransformOrigin = () => {
    if (!parentRef.current) return;

    const parentWidth = parentRef.current.clientWidth;
    const elements = parentRef.current.querySelectorAll('.rotate-i');

    const windowWidth = window.innerWidth;
    let originMultiplier = 0.54;
    let elementSize = '3rem';

    if (windowWidth > 450 && windowWidth < 640) {
      elementSize = '5rem';
      originMultiplier = 0.555;
    } else if (windowWidth >= 640 && windowWidth < 768) {
      elementSize = '7rem';
      originMultiplier = 0.52;
    } else if (windowWidth >= 768 && windowWidth < 1000) {
      elementSize = '5rem';
      originMultiplier = 0.5;
    } else if (windowWidth >= 1000 && windowWidth < 1200) {
      elementSize = '7rem';
      originMultiplier = 0.52;
    } else if (windowWidth >= 1200) {
      elementSize = '9rem';
      originMultiplier = 0.53;
    }

    elements.forEach((element) => {
      element.style.transitionDuration = '0s';

      element.style.width = elementSize;
      element.style.height = elementSize;

      const originValue = `${parentWidth * originMultiplier}px`;
      element.style.transformOrigin = originValue + ' center';

      setTimeout(() => {
        element.style.transitionDuration = '0.3s';
      }, 50);
    });
  };

  useEffect(() => {
    updateTransformOrigin();

    window.addEventListener('resize', updateTransformOrigin);

    return () => {
      window.removeEventListener('resize', updateTransformOrigin);
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center flex-1 p-2 sm:p-10 basis-7/12 bg-slate-600"
      ref={parentRef}
    >
      <div className="relative w-full border-2 border-white rounded-full squareAspectRatio">
        <div className="relative flex items-center justify-center w-full h-full -left-1/2">
          {employeeArray.map((employee, i) => (
            <TeamCirclePerson
              employee={employee}
              key={i}
              index={i}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamCircle;
