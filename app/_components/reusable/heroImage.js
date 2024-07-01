'use client';

import { useState } from 'react';

function DodgingImage({ className, children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const imageWrapper = e.currentTarget;
    const rect = imageWrapper.getBoundingClientRect();

    const offsetX =
      (rect.width / 80) * Math.sign(rect.left + rect.width / 50 - e.clientX);
    const offsetY =
      (rect.height / 80) * Math.sign(rect.top + rect.height / 50 - e.clientY);

    setPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex items-center justify-center transition-transform duration-500 z-10 ${className} w-full mx-auto`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default DodgingImage;
