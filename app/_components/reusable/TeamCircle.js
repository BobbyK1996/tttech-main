'use client';

import { useEffect, useRef } from 'react';

import trishnaMin from '@/public/trishna-min.jpg';
import Image from 'next/image';

function TeamCircle() {
  const parentRef = useRef(null);

  const updateTransformOrigin = () => {
    if (!parentRef.current) return;

    const parentWidth = parentRef.current.clientWidth;
    const elements = parentRef.current.querySelectorAll('.rotate-i');

    elements.forEach((element, index) => {
      const originValue = `${parentWidth * 0.5}px`;
      element.style.transformOrigin = originValue + ' center';
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
      className="flex items-center justify-center flex-1 p-10 basis-7/12 bg-slate-600"
      ref={parentRef}
    >
      <div className="relative w-full border-2 border-white rounded-full squareAspectRatio">
        <div className="relative flex items-center justify-center w-full h-full cursor-pointer -left-1/2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{ '--i': i }}
              className="absolute w-20 h-20 duration-500 border border-white rounded-full shadow-lg rotate-i"
            >
              <Image
                src={trishnaMin}
                alt="image"
                className="absolute top-0 left-0 object-cover w-full h-full rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamCircle;
