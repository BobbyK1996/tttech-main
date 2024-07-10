'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import reactSVG from '@/public/react.svg';
import vueSVG from '@/public/vue.svg';
import angularSVG from '@/public/angular.svg';

function DodgingSvg() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgs = container.querySelectorAll('.svg-image');

    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      svgs.forEach((svg) => {
        const svgRect = svg.getBoundingClientRect();
        const svgX = svgRect.left + svgRect.width / 2;
        const svgY = svgRect.top + svgRect.height / 2;

        const diffX = svgX - mouseX;
        const diffY = svgY - mouseY;

        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        const maxDistance = 5;
        const dodgeFactor = Math.min(1, maxDistance / distance);

        const moveX = diffX * dodgeFactor;
        const moveY = diffY * dodgeFactor;

        const finalX = svgRect.left + moveX;
        const finalY = svgRect.top + moveY;

        const boundedX = Math.max(
          0,
          Math.min(window.innerWidth - svgRect.width, finalX)
        );
        const boundedY = Math.max(
          0,
          Math.min(window.innerHeight - svgRect.height, finalY)
        );

        svg.style.transform = `translate(${boundedX - svgRect.left}px, ${
          boundedY - svgRect.top
        }px)`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div className="absolute transition-transform svg-image">
        <Image src={reactSVG} alt="" width={50} height={50} />
      </div>

      <div className="absolute transition-transform duration-1000 svg-image top-1/2">
        <Image src={vueSVG} alt="" width={50} height={50} />
      </div>

      <div className="absolute transition-transform svg-image top-20 left-1/2">
        <Image src={angularSVG} alt="" width={50} height={50} />
      </div>
    </div>
  );
}

export default DodgingSvg;
