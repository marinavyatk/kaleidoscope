import { useRef, useState } from 'react';
import { Card } from '../card/card';
import s from './carousel.module.scss';
import { ProgressBar } from '../progressBar/progressBar';
import Arrow from '../../assets/arrow-up.svg';
import { Product } from '@/common/types';

export type CarouselProps = {
  products: Product[];
};

export const Carousel = (props: CarouselProps) => {
  const { products } = props;
  const [activeIndex, setActiveIndex] = useState(products.length < 3 ? 0 : 1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextItem = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevItem = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const getStatus = (index: number) => {
    if (index === activeIndex) return 'activeCard';
    if (index === (activeIndex + 1) % products.length) return 'nextCard';
    if (index === (activeIndex - 1 + products.length) % products.length) return 'prevCard';
    return 'hiddenCard';
  };

  const generateItems = () => {
    if (!products.length) return;
    const itemComponents = [];
    for (let i = activeIndex - 1; i <= activeIndex + 1; i++) {
      let index = i;
      if (i < 0) {
        index = products.length + i;
      } else if (i >= products.length) {
        index = i % products.length;
      }
      itemComponents.push(
        <Card
          key={`card-${index}`}
          status={getStatus(index)}
          activeSlide={activeIndex}
          setActiveIndex={setActiveIndex}
          product={products[index]}
          products={products}
        />,
      );
    }
    return itemComponents;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextItem();
    }

    if (touchEndX.current - touchStartX.current > 50) {
      prevItem();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  return (
    <div
      className={s.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={s.itemsContainer}>{generateItems()}</div>
      {products.length && (
        <div className={s.navPanel}>
          <button className={s.btnPrev} onClick={prevItem}>
            <Arrow />
          </button>
          <ProgressBar currentSlide={activeIndex + 1} total={products.length} />
          <button className={s.btnNext} onClick={nextItem}>
            <Arrow />
          </button>
        </div>
      )}
    </div>
  );
};
