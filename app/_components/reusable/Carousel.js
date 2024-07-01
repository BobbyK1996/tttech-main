'use client';

import { useEffect, useRef, useState } from 'react';

//For some reason, useReducer breaks this

function Carousel({ cards }) {
  const carouselRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentCardId, setCurrentCardId] = useState(cards[0].id);

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

  const handleScroll = () => {
    if (!carouselRef.current) return;

    const containerWidth = carouselRef.current.clientWidth;
    const scrollPosition = carouselRef.current.scrollLeft;

    let totalWidth = 0;
    let newCardId = 1;

    cards.some((card, index) => {
      const cardElement = carouselRef.current.children[index];
      if (!cardElement) return true;

      const cardWidth = cardElement.clientWidth;

      if (
        scrollPosition >= totalWidth &&
        scrollPosition < totalWidth + cardWidth
      ) {
        newCardId = card.id;
        console.log(newCardId);
        return true; // Exit loop once the correct card is found
      }

      totalWidth += cardWidth;
      return false;
    });

    setCurrentCardId(newCardId);
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const goToSlide = (slideId) => {
    const index = cards.findIndex((card) => card.id === slideId);
    if (index !== -1 && carouselRef.current) {
      const cardElement = carouselRef.current.children[index];
      const cardWidth = cardElement.clientWidth;
      const newScrollLeft = index * cardWidth;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setCurrentCardId(slideId);
    }
  };

  return (
    <div
      className="relative flex gap-2 overflow-auto select-none scroll-smooth snap-mandatory snap-x"
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {cards.map((card, index) => {
        return (
          <div
            className="relative w-full bg-red-400 h-52 mr-5px shrink-0 snap-start"
            key={card.id}
          >
            {card.content}
          </div>
        );
      })}
    </div>
  );
}

export default Carousel;
