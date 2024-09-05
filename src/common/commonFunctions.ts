import { MutableRefObject } from 'react';
import { SwiperClass } from 'swiper/react';

export const handlePrevButtonClick = (swiperRef: MutableRefObject<SwiperClass>) => {
  swiperRef.current?.slidePrev();
};
export const handleNextButtonClick = (swiperRef: MutableRefObject<SwiperClass>) => {
  swiperRef.current?.slideNext();
};
export const handleSwiper = (swiper: SwiperClass, swiperRef: MutableRefObject<SwiperClass>) => {
  swiperRef.current = swiper;
};
