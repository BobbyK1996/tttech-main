import { useEffect } from 'react';

import { isInputField } from '@lib/helperClient';
import {
  validateFunction,
  validateHTMLElement,
  validateNumber,
} from '@lib/helperShared';

function useSwipe(ref, step, setStep) {
  useEffect(() => {
    const htmlElement = ref.current;

    if (!htmlElement) return;

    const isValidStep = validateNumber(step, 'Step');
    const isValidSetStep = validateFunction(setStep, 'setStep');
    const isValidHTML = validateHTMLElement(htmlElement, 'htmlElement');

    if (!isValidStep || !isValidSetStep || !isValidHTML)
      throw new Error(
        `Invalid parameters passed into useSwipe. htmlElement should be HTML Element; current ${typeof htmlElement}. step should be a number; current ${typeof step}. setStep should be a function; current ${typeof setStep}`,
      );

    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    const handleStart = (x) => {
      startX = x;
      currentX = x;
      isSwiping = true;
    };

    const handleMove = (x) => {
      if (!isSwiping || !htmlElement) return;

      currentX = x;

      if (Math.abs(currentX - startX) > 50) {
        htmlElement.style.opacity = 0.5;
        htmlElement.style.transform = 'scale(0.98)';
      }
    };

    const handleEnd = () => {
      if (!htmlElement) return;

      const swipeDistance = startX - currentX;
      htmlElement.style.opacity = 1;
      htmlElement.style.transform = 'scale(1)';

      if (swipeDistance > 50 && step < 3) {
        setStep((previous) => previous + 1);
      }

      if (swipeDistance < -50 && step > 1) {
        setStep((previous) => previous - 1);
      }

      isSwiping = false;
    };

    const handleTouchStart = (e) => {
      if (isInputField(e.target)) return;
      handleStart(e.touches[0].clientX);
    };
    const handleTouchMove = (e) => {
      if (isInputField(e.target)) return;
      handleMove(e.touches[0].clientX);
    };

    const handleMouseStart = (e) => {
      if (isInputField(e.target)) return;
      handleStart(e.clientX);
    };
    const handleMouseMove = (e) => {
      if (isInputField(e.target)) return;
      handleMove(e.clientX);
    };

    if (htmlElement) {
      //event handlers mouse activity
      htmlElement.addEventListener('mousedown', handleMouseStart);
      htmlElement.addEventListener('mousemove', handleMouseMove);
      htmlElement.addEventListener('mouseup', handleEnd);
      htmlElement.addEventListener('mouseleave', handleEnd);

      //event handlers for touchscreen activity
      htmlElement.addEventListener('touchstart', handleTouchStart);
      htmlElement.addEventListener('touchmove', handleTouchMove);
      htmlElement.addEventListener('touchend', handleEnd);
    }

    return () => {
      if (htmlElement) {
        htmlElement.removeEventListener('mousedown', handleMouseStart);
        htmlElement.removeEventListener('mousemove', handleMouseMove);
        htmlElement.removeEventListener('mouseup', handleEnd);
        htmlElement.removeEventListener('mouseleave', handleEnd);

        htmlElement.removeEventListener('touchstart', handleTouchStart);
        htmlElement.removeEventListener('touchmove', handleTouchMove);
        htmlElement.removeEventListener('touchend', handleEnd);
      }
    };
  }, [step, setStep]);
}

export default useSwipe;
