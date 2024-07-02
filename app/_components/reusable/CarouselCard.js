function CarouselCard({ card }) {
  return (
    <div className="w-full bg-red-400 mr-5px shrink-0 snap-start" key={card.id}>
      {card.content}
    </div>
  );
}

export default CarouselCard;
