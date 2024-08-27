import Image from 'next/image';
import React from 'react';

function TeamCirclePerson({ employee, index, isActive, onClick }) {
  return (
    <div
      style={{ '--i': index }}
      onClick={onClick}
      className={`absolute rounded-full shadow-lg cursor-pointer rotate-i grayscale hover:border-primary-700 hover:border-4 hover:grayscale-0 ${
        isActive && 'grayscale-0 border-primary-700 border-4'
      }`}
    >
      <Image
        src={employee.image}
        alt={employee.name}
        className="absolute top-0 left-0 object-cover w-full h-full p-1 rounded-full rotate-i-image"
      />
    </div>
  );
}

export default React.memo(TeamCirclePerson);
