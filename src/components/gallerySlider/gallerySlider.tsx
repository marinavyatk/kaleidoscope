import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import s from './gallerySlider.module.scss';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { Picture } from '@/components/picture/picture';
import Image from 'next/image';
import { Keyboard, Navigation } from 'swiper/modules';
import { handleSwiper } from '@/common/commonFunctions';
import { NavButtons } from '@/components/navButtons/navButtons';

type GallerySliderProps = {
  activeIndex: number;
  images: string[];
  description: string;
};

export const GallerySlider = (props: GallerySliderProps) => {
  const { activeIndex, images, description } = props;
  const swiperRef = useRef<SwiperClass>(null);

  const updateSlidesOpacity = () => {
    const swiper = swiperRef.current;
    if (!swiper || !swiper.el) return;
    const containerRect = swiper.el.getBoundingClientRect();
    swiper.slides.forEach((slide) => {
      const slideElement = slide as HTMLElement;
      const slideRect = slideElement.getBoundingClientRect();
      const isFullyVisible =
        slideRect.left >= containerRect.left && slideRect.right <= containerRect.right;
      slideElement.style.opacity = isFullyVisible ? '1' : '0.25';
      slideElement.style.transition = 'opacity 0.2s';
    });
  };

  useEffect(() => {
    updateSlidesOpacity();
  }, [activeIndex]);

  const photos = images.map((photo) => (
    <SwiperSlide key={photo} className={s.slide}>
      <ViewCloserModal
        imgSrc={photo}
        trigger={
          <Picture
            component={Image}
            src={photo}
            alt=''
            fill
            sizes='(max-width: 767px) 252px, (max-width: 1780px) 639px, 1076px'
            containerComponent={'button'}
            containerProps={{ 'aria-label': 'Посмотреть', className: s.photo }}
          />
        }
      />
    </SwiperSlide>
  ));

  return (
    <div className={s.gallerySlider}>
      <div>
        <Swiper
          key={activeIndex} //need for correct render slides when activeStepIndex changes
          modules={[Keyboard, Navigation]}
          slidesPerView={'auto'}
          onSwiper={(swiper) => {
            handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>);
          }}
          onResize={() => {
            updateSlidesOpacity();
          }}
          keyboard
          className={s.slidesContainer}
          onSlideChange={() => {
            swiperRef.current?.update();
          }}
          onSlideChangeTransitionEnd={() => {
            updateSlidesOpacity();
          }}
          centeredSlides={true}
          centeredSlidesBounds={true}
        >
          {photos}
        </Swiper>
      </div>
      <div className={s.descriptionBlock}>
        <p className={s.description}>{description}</p>
        <NavButtons
          swiperRef={swiperRef}
          className={s.navButtons}
          key={`nav-buttons-${activeIndex}`}
        />
      </div>
    </div>
  );
};
