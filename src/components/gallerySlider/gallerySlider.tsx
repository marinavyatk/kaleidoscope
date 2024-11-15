import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import s from './gallerySlider.module.scss';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { Picture } from '@/components/picture/picture';
import Image from 'next/image';
import { Keyboard, Navigation } from 'swiper/modules';
import { handleSwiper } from '@/common/commonFunctions';
import { NavButtons } from '@/components/navButtons/navButtons';
import { clsx } from 'clsx';

type GallerySliderProps = {
  activeIndex: number;
  images: string[];
  description: string;
};

export const GallerySlider = (props: GallerySliderProps) => {
  const { activeIndex, images, description } = props;
  const swiperRef = useRef<SwiperClass>(null);
  const [isAtEnd, setIsAtEnd] = useState(false); //need for swiper last slide issue

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const photos = images.map((photo, index) => (
    <SwiperSlide
      key={photo}
      className={clsx(s.slide, isAtEnd && index === images.length - 1 && s.activeLastSlide)}
    >
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

  const handleReachEnd = () => {
    setIsAtEnd(true);
  };
  const handleSlideChange = () => {
    if (isAtEnd) setIsAtEnd(false);
  };

  return (
    <>
      {isClient && (
        <div className={s.gallerySlider}>
          <div>
            <Swiper
              key={activeIndex} //need for correct render slides when activeIndex changes
              modules={[Keyboard, Navigation]}
              slidesPerView={'auto'}
              onSwiper={(swiper) => {
                handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>);
              }}
              keyboard
              watchSlidesProgress
              onReachEnd={handleReachEnd} //need for swiper last slide issue
              onSlideChange={handleSlideChange} //need for swiper last slide issue
              speed={300}
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
      )}
    </>
  );
};
