import { ProductCard } from '@/sections/productCard/productCard';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { handleSwiper } from '@/common/commonFunctions';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Product } from '@/common/types';
import { useState } from 'react';
import s from './productCardSlider.module.scss';
import { clsx } from 'clsx';

export type ProductCardsSliderProps = {
  products: Product[];
  activeSlide: number;
  setActiveIndex: (index: number) => void;
  isVisible: boolean;
  setIsCardSliderVisible: (isVisible: boolean) => void;
};

export const ProductCardSlider = (props: ProductCardsSliderProps) => {
  const { products, activeSlide, setActiveIndex, isVisible, setIsCardSliderVisible } = props;
  const swiperRef = useRef<SwiperClass>(null);
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set());

  const handleSlideChange = (swiper: SwiperClass) => {
    const currentIndex = swiper.realIndex;
    console.log('currentIndex', currentIndex);
    if (!viewedSlides.has(currentIndex)) {
      setViewedSlides((prev) => new Set(prev).add(currentIndex));
    }
  };

  const handleOnClose = (index: number) => {
    if (activeSlide !== index) setActiveIndex(index);
    setIsCardSliderVisible(false);
  };

  console.log('activeSlide', activeSlide);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isVisible]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeSlide);
    }
  }, [activeSlide]);

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
    <div className={clsx(s.overlay, !isVisible && s.hidden)}>
      <div className={clsx(s.productsSlider, !isVisible && s.hidden)}>
        <Swiper
          modules={[Keyboard, Navigation]}
          onSwiper={(swiper) => handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>)}
          onSlideChange={handleSlideChange}
          keyboard
          loop
          initialSlide={!isVisible ? 1 : activeSlide}
          allowTouchMove={false}
          autoHeight
          observer
          observeParents
        >
          {cards}
        </Swiper>
      </div>
    </div>
  );
};
