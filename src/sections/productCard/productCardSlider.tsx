import { ProductCard } from '@/sections/productCard/productCard';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { handleSwiper } from '@/common/commonFunctions';
import { memo, MutableRefObject, useEffect, useRef } from 'react';
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

const ProductCardSlider = (props: ProductCardsSliderProps) => {
  const { products, activeSlide, setActiveIndex, isVisible, setIsCardSliderVisible } = props;
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
    setIsCardSliderVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isVisible]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = false;
      swiperRef.current.updateAutoHeight();
      swiperRef.current.disable();
    }
  }, [swiperRef.current]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current?.enable();
      swiperRef.current.slideTo(activeSlide);
      swiperRef.current.updateAutoHeight();
      swiperRef.current?.disable();
    }
  }, [activeSlide]);

  const cards = products.map((product, index) => {
    const hasViewed = viewedSlides.has(index);
    return (
      <SwiperSlide key={product.name} className={s.slide}>
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
          simulateTouch={false}
          autoHeight
          observer
          observeParents
          touchStartPreventDefault={false}
        >
          {cards}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(ProductCardSlider);
