import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Card } from '../card/card';
import s from './carousel.module.scss';
import Arrow from '../../assets/arrow-up.svg';
import { Product } from '@/common/types';
import { clsx } from 'clsx';
import { ProgressBar } from '@/components/progressBar/progressBar';

export type CarouselProps = {
  products: Product[];
};

export const Carousel = ({ products }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(products.length < 3 ? 0 : 1);
  const [cardStatus, setCardStatus] = useState<string[]>([]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    updateCardClasses();
  }, [activeIndex]);

  const updateCardClasses = () => {
    const statuses = products.map((_, index) => {
      if (index === activeIndex) return 'activeCard';
      if (index === (activeIndex + 1) % products.length) return 'nextCard';
      if (index === (activeIndex - 1 + products.length) % products.length) return 'prevCard';
      return 'hiddenCard';
    });
    setCardStatus(statuses);
  };

  const nextItem = () => {
    setDirection('forward');
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevItem = () => {
    setDirection('backward');
    setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextItem();
    }

    if (touchEndX.current - touchStartX.current > 50) {
      prevItem();
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    console.log(event.currentTarget);
    if (event.key === 'ArrowRight') {
      nextItem();
    } else if (event.key === 'ArrowLeft') {
      prevItem();
    }
  };

  return (
    <div
      className={s.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={s.itemsContainer}>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            status={cardStatus[index]}
            direction={direction}
            products={products}
            activeSlide={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
      <div className={clsx(s.navPanel, !products.length && s.hidden)}>
        <button className={s.btnPrev} onClick={prevItem}>
          <Arrow />
        </button>
        <ProgressBar currentSlide={activeIndex + 1} total={products.length} />
        <button className={s.btnNext} onClick={nextItem}>
          <Arrow />
        </button>
      </div>
    </div>
  );
};
