import s from './carousel.module.scss';
import { Product } from '@/common/types';
import { useCarousel } from '@/common/customHooks/useCarousel';
import { NavPanel } from '@/components/navPanel/navPanel';
import { RenderCard } from '@/components/card/renderCard';

export type CarouselProps = {
  products: Product[];
};

export const RenderCarousel = ({ products }: CarouselProps) => {
  const {
    activeIndex,
    cardStatus,
    direction,
    prevItem,
    nextItem,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useCarousel(products);

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
          <RenderCard
            key={index}
            product={product}
            status={cardStatus[index]}
            direction={direction}
            products={products}
          />
        ))}
      </div>
      <NavPanel
        items={products}
        onBackClick={prevItem}
        onForwardClick={nextItem}
        activeIndex={activeIndex}
      />
    </div>
  );
};
