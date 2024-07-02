import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

function CarouselCard({ card, state }) {
  return (
    <div className="relative flex items-center justify-center w-full h-full ">
      <FaQuoteLeft className="absolute top-0 left-0 text-5xl md:left-7 md:text-7xl" />
      <FaQuoteRight className="absolute bottom-0 right-0 text-5xl md:right-7 md:text-7xl" />
      <div
        className={`w-11/12 h-60 bg-blue-300 rounded-xl transition-all shadow-2xl bg-gradient-to-br from-space-950 via-primary-950 via-40% to-primary-900 to-100% flex flex-col justify-center items-center p-8 ${
          state.dragging && card.id === state.currentCardId && 'scale-75 blur'
        }`}
      >
        <span className="hidden mb-2 sm:block">⭐⭐⭐⭐⭐</span>
        <p className="mb-4 overflow-hidden text-sm leading-6 font-poppins md:w-10/12 md:line-clamp-6 text-clip line-clamp-4">
          {card.content}
        </p>
        <p className="flex items-center justify-center flex-1 mx-auto text-xs font-poppins">
          {card.quoter}
        </p>
      </div>
    </div>
  );
}

export default CarouselCard;
