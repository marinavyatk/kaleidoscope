import s from './albumsNavigation.module.scss';
import Image from 'next/image';
import { Album } from '@/common/types';
import { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Scrollbar } from 'swiper/modules';
import { useScreenWidth } from '@/common/customHooks/useScreenWidth';

type VerticalGalleryProps = {
  albums: Album[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
} & ComponentPropsWithoutRef<typeof Swiper>;

export const AlbumsNavigation = (props: VerticalGalleryProps) => {
  const { albums, activeIndex, setActiveIndex, className, ...restProps } = props;
  const classNames = clsx(s.albumsNavigation, className);
  const isSmallScreen = useScreenWidth(1780);

  const covers = albums?.map((event, index) => {
    return (
      <SwiperSlide
        className={clsx(s.coverContainer, index === activeIndex && s.active)}
        onClick={() => setActiveIndex(index)}
        key={event.img + index}
      >
        <Image
          src={event.img}
          alt='cover'
          fill
          className={s.cover}
          sizes='(max-width: 767px) 130px, (max-width: 1780px) 261px, 433px'
        />
        <div className={s.caption}>{event.caption}</div>
      </SwiperSlide>
    );
  });
  return (
    <Swiper
      {...restProps}
      direction={isSmallScreen ? 'horizontal' : 'vertical'}
      slidesPerView={'auto'}
      modules={[Scrollbar, Mousewheel]}
      className={classNames}
      scrollbar={{
        el: `.${s.scrollbar}`,
        draggable: true,
        dragSize: 'auto',
        hide: false,
      }}
      mousewheel={{ forceToAxis: true }}
      simulateTouch={true}
    >
      {covers}
      <div className={s.scrollbar} />
    </Swiper>
  );
};
