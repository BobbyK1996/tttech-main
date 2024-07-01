'use client';

import { useRef, useState } from 'react';

//For some reason, useReducer breaks this

function Carousel({ cards }) {
  const carouselRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    e.preventDefault();
    setDragging(true);
    const rect = carouselRef.current.getBoundingClientRect();
    setStartX(e.pageX - rect.left);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setDragging(false);
    if (!carouselRef.current) return;
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const rect = carouselRef.current.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const averageCardWidth = carouselRef.current.scrollWidth / cards.length;
    const walk = (x - startX) * (averageCardWidth / 400);
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="flex gap-2 overflow-auto select-none scroll-smooth snap-mandatory snap-x"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {cards.map((card, index) => {
        return (
          <div
            className="w-full bg-red-400 h-52 mr-5px shrink-0 snap-start"
            key={index}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}

export default Carousel;
