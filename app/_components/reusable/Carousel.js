'use client';

import { useRef, useEffect, useReducer, useCallback } from 'react';

import {
  createCarouselInitialState,
  reducer,
} from '@lib/reducers/carouselCardReducer';
import CarouselCard from '@components/reusable/CarouselCard';

function Carousel({ carouselCards }) {
  const carouselRef = useRef(null);

  const [state, dispatch] = useReducer(
    reducer,
    createCarouselInitialState(carouselCards)
  );

  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    e.preventDefault();
    dispatch({ type: 'SET_DRAGGING', value: true });
    const rect = carouselRef.current.getBoundingClientRect();
    dispatch({ type: 'SET_START_X', value: e.pageX - rect.left });
    dispatch({
      type: 'SET_SCROLL_LEFT',
      value: carouselRef.current.scrollLeft,
    });
  };

  const handleMouseUp = () => dispatch({ type: 'SET_DRAGGING', value: false });

  const handleMouseMove = (e) => {
    if (!state.dragging) return;
    e.preventDefault();

    const rect = carouselRef.current.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const averageCardWidth =
      carouselRef.current.scrollWidth / carouselCards.length;
    const walk = (x - state.startX) * (averageCardWidth / 400);

    carouselRef.current.scrollLeft = state.scrollLeft - walk;
  };

  const goToSlide = (slideId) => {
    const index = carouselCards.findIndex((card) => card.id === slideId);
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

  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;

    const scrollPosition = carouselRef.current.scrollLeft;

    let totalWidth = 0;
    let newCardId = 1;

    carouselCards.some((card, index) => {
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

    dispatch({ type: 'SET_CURRENT_CARD_ID', value: newCardId });
  }, [carouselCards, dispatch]);

  useEffect(() => {
    const currentCarousel = carouselRef.current;

    if (!currentCarousel) return;
    currentCarousel.addEventListener('scroll', handleScroll);
    return () => {
      if (currentCarousel) {
        currentCarousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div className="relative w-full">
      <div
        className={`flex overflow-auto select-none h-80 scroll-smooth snap-mandatory snap-x ${
          state.dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* {render({ carouselRef, goToSlide, state, carouselCards })} */}

        {carouselCards.map((card) => {
          return (
            <div
              className={`w-full px-4 py-6 shrink-0 snap-start`}
              key={card.id}
            >
              <CarouselCard card={card} state={state} />
            </div>
          );
        })}
      </div>

      <span className="absolute mx-auto -translate-x-1/2 bottom-2 left-1/2 min-w-20">
        {carouselCards.map((card) => (
          <button
            onClick={() => goToSlide(card.id)}
            className={`w-3 h-3 border-2 border-white rounded-full transition-[width] duration-100 mx-1 ${
              card.id === state.currentCardId
                ? 'bg-accent-500 w-6'
                : 'bg-slate-500'
            }`}
            key={card.id}
          ></button>
        ))}
      </span>
    </div>
  );
}

export default Carousel;
