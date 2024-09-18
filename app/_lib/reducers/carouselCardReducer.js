export const createCarouselInitialState = (carouselCards) => ({
  dragging: false,
  startX: 0,
  scrollLeft: 0,
  currentCardId: carouselCards[0]?.id || null,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DRAGGING':
      return { ...state, dragging: action.value };
    case 'SET_START_X':
      return { ...state, startX: action.value };
    case 'SET_SCROLL_LEFT':
      return { ...state, scrollLeft: action.value };
    case 'SET_CURRENT_CARD_ID':
      return { ...state, currentCardId: action.value };
    default:
      return state;
  }
};
