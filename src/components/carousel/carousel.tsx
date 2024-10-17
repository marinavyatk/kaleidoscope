import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../card/card';
import s from './carousel.module.scss';
import Arrow from '../../assets/arrow-up.svg';
import { Product } from '@/common/types';
import { clsx } from 'clsx';
import { ProgressBar } from '@/components/progressBar/progressBar';
import ProductCardSlider from '@/sections/productCard/productCardSlider';

export type CarouselProps = {
  products: Product[];
  setIsCardSliderVisible: (isVisible: boolean) => void;
  isCardSliderOpen: boolean;
  setIsCardSliderOpen: (isOpen: boolean) => void;
  activeIndex: number;
  setActiveIndex: (index: (prevIndex: number) => number) => void;
};

export const Carousel = ({
  products,
  setIsCardSliderVisible,
  isCardSliderOpen,
  setIsCardSliderOpen,
  activeIndex,
  setActiveIndex,
}: CarouselProps) => {
  // const [activeIndex, setActiveIndex] = useState(products.length < 3 ? 0 : 1);
  const [cardStatus, setCardStatus] = useState<string[]>([]);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  // const [isCardSliderOpen, setIsCardSliderOpen] = useState(false);
  // const [isCardSliderVisible, setIsCardSliderVisible] = useState(true);
  console.log('Carousel', activeIndex);
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
    const target = event.target as Element;
    if (!target.closest('button')) {
      touchStartX.current = event.touches[0].clientX;
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

  const handleShowMore = () => {
    if (!isCardSliderOpen) {
      setIsCardSliderOpen(true);
    }
    setIsCardSliderVisible(true);
  };

  // const setActiveIndexMemo = useCallback(setActiveIndex, []);
  // const setIsCardSliderVisibleMemo = useCallback(setIsCardSliderVisible, []);

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
            // setActiveIndex={setActiveIndex}
            buttonProps={{ onClick: handleShowMore }}
          />
        ))}
      </div>
      <div className={clsx(s.navPanel, !products.length && s.hidden)}>
        <button
          className={s.btnPrev}
          onClick={prevItem}
          aria-label={'Назад'}
          disabled={products.length <= 1}
        >
          <Arrow />
        </button>
        <ProgressBar currentSlide={activeIndex + 1} total={products.length} />
        <button
          className={s.btnNext}
          onClick={nextItem}
          aria-label={'Вперёд'}
          disabled={products.length <= 1}
        >
          <Arrow />
        </button>
      </div>
      {/*{isCardSliderOpen && (*/}
      {/*  <ProductCardSlider*/}
      {/*    products={products}*/}
      {/*    activeSlide={activeIndex}*/}
      {/*    setActiveIndex={setActiveIndexMemo}*/}
      {/*    isVisible={isCardSliderVisible}*/}
      {/*    setIsCardSliderVisible={setIsCardSliderVisibleMemo}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};
