import s from './productCardModal.module.scss';
import { Modal } from '../modal';
import { ProductCard } from '@/sections/productCard/productCard';
import { Button } from '../../button/button';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { handleSwiper } from '@/common/commonFunctions';
import { MutableRefObject, useRef } from 'react';
import { Product } from '@/common/types';
import { useState } from 'react';

export type ProductCardsSliderProps = {
  products: Product[];
  activeSlide: number;
  setActiveIndex: (index: number) => void;
};

export const ProductCardModal = (props: ProductCardsSliderProps) => {
  const { products, activeSlide, setActiveIndex } = props;
  const swiperRef = useRef<SwiperClass>(null);
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set());

  const handleSlideChange = (swiper: SwiperClass) => {
    const currentIndex = swiper.realIndex;
    if (!viewedSlides.has(currentIndex)) {
      setViewedSlides((prev) => new Set(prev).add(currentIndex));
    }
  };

  const handleOnClose = (index: number) => {
    if (activeSlide !== index) setActiveIndex(index);
  };

  const cards = products.map((product, index) => {
    const hasViewed = viewedSlides.has(index);
    return (
      <SwiperSlide key={product.name}>
        <ProductCard
          productData={product}
          onClose={() => handleOnClose(index)}
          swiperRef={swiperRef}
          hasViewed={hasViewed}
        />
      </SwiperSlide>
    );
  });

  return (
    <Modal
      contentProps={{ className: s.modalContainer }}
      modalHeader={'Product card'}
      trigger={<Button>Смотреть</Button>}
    >
      <div className={s.productsSlider}>
        <Swiper
          modules={[Keyboard, Navigation]}
          onSwiper={(swiper) => handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>)}
          onSlideChange={handleSlideChange}
          keyboard
          loop
          initialSlide={activeSlide}
          allowTouchMove={false}
          autoHeight
          observer
          observeParents
        >
          {cards}
        </Swiper>
      </div>
    </Modal>
  );
};
