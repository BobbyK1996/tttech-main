'use client';

import { useRef, useState, useEffect } from 'react';

//For some reason, useReducer breaks this

function Carousel({ cards, children }) {
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

  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();

    const rect = carouselRef.current.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const averageCardWidth = carouselRef.current.scrollWidth / cards.length;
    const walk = (x - startX) * (averageCardWidth / 400);

    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

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
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;

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
        return true;
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

  return (
    <div className="relative w-full">
      <div
        className="flex overflow-auto select-none h-52 scroll-smooth snap-mandatory snap-x"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {cards.map((card) => {
          return (
            <div
              className="w-full bg-red-400 mr-5px shrink-0 snap-start"
              key={card.id}
            >
              {children ? children : card.content}
            </div>
          );
        })}
      </div>

      <span
        className="absolute bottom-0 mx-auto -translate-x-1/2 left-1/2 min-w-20"
        style={{ display: 'inline-block' }}
      >
        {cards.map((card) => (
          <button
            onClick={() => goToSlide(card.id)}
            className={`w-3 h-3 border-2 border-white rounded-full ${
              card.id === currentCardId ? 'bg-accent-400' : 'bg-slate-700'
            }`}
            key={card.id}
          ></button>
        ))}
      </span>
    </div>
  );
}

export default Carousel;
