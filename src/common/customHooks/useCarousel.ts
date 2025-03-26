import { KeyboardEvent, useEffect, useRef, useState } from 'react';

export const useCarousel = (items: any[], lastVisible = false) => {
  const visibleCardsCount = 3;
  const isLessThenVisible = items.length < visibleCardsCount;
  const startIndex = lastVisible || isLessThenVisible ? 0 : 1;
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [cardStatus, setCardStatus] = useState<string[]>([]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    updateCardClasses();
  }, [activeIndex]);

  const updateCardClasses = () => {
    const statuses = items.map((_, index) => {
      if (index === activeIndex) return 'activeCard';
      if (index === (activeIndex + 1) % items.length) return 'nextCard';
      if (index === (activeIndex - 1 + items.length) % items.length) return 'prevCard';
      return 'hiddenCard';
    });
    setCardStatus(statuses);
  };

  const nextItem = () => {
    setDirection('forward');
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevItem = () => {
    setDirection('backward');
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const target = event.target as Element;
    if (!target.closest('button')) {
      touchStartX.current = event.touches[0].clientX;
      touchEndX.current = event.touches[0].clientX;
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const target = event.target as Element;
    if (!target.closest('button')) {
      touchEndX.current = event.touches[0].clientX;
    }
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const target = event.target as Element;
    if (!target.closest('button')) {
      const swipeDistance = touchStartX.current - touchEndX.current;

      if (swipeDistance > 50) {
        nextItem();
      } else if (swipeDistance < -50) {
        prevItem();
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      nextItem();
    } else if (event.key === 'ArrowLeft') {
      prevItem();
    }
  };

  return {
    activeIndex,
    setActiveIndex,
    cardStatus,
    direction,
    nextItem,
    prevItem,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  };
};
