'use client';

import { useState } from 'react';

function DodgingImage({ className, children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const imageWrapper = e.currentTarget;
    const rect = imageWrapper.getBoundingClientRect();

    const offsetX =
      (rect.width / 20) * Math.sign(rect.left + rect.width / 10 - e.clientX);
    const offsetY =
      (rect.height / 20) * Math.sign(rect.top + rect.height / 10 - e.clientY);

    setPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center transition-transform duration-500 ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default DodgingImage;
