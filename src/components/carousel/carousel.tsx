import { useState } from 'react';
import { Card } from '../card/card';
import s from './carousel.module.scss';
import { Product } from '@/common/types';
import { ProductCardModal } from '@/components/modal/productCardModal/productCardModal';
import { useCarousel } from '@/common/customHooks/useCarousel';
import { NavPanel } from '@/components/navPanel/navPanel';

export type CarouselProps = {
  products: Product[];
};

export const Carousel = ({ products }: CarouselProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [initialOpenModal, setInitialOpenModal] = useState<boolean>(false);

  const {
    activeIndex,
    setActiveIndex,
    cardStatus,
    direction,
    prevItem,
    nextItem,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useCarousel(products);

  const onOpenClickHandler = (): void => {
    const catalog = document.getElementById('catalog');
    catalog?.scrollIntoView({ behavior: 'smooth' });
    if (!initialOpenModal) {
      setInitialOpenModal(true);
    }
    setOpenModal(true);
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
        {products?.map((product, index) => (
          <Card
            key={index}
            product={product}
            status={cardStatus[index]}
            direction={direction}
            onOpenClick={onOpenClickHandler}
          />
        ))}
      </div>
      <NavPanel
        itemsLength={products.length}
        onBackClick={prevItem}
        onForwardClick={nextItem}
        activeIndex={activeIndex}
      />
      {initialOpenModal && (
        <ProductCardModal
          products={products}
          activeSlide={openModal ? activeIndex : 1}
          setActiveIndex={setActiveIndex}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};
