import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { MutableRefObject, useRef, useState } from 'react';
import { handleSwiper } from '@/common/commonFunctions';
import { Keyboard, Navigation } from 'swiper/modules';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { NavButtons } from '@/components/navButtons/navButtons';
import s from './gallery.module.scss';
import Image from 'next/image';
import { Picture } from '@/components/picture/picture';
import { AlbumData } from '@/common/types';
import { AlbumsNavigation } from '@/components/albumsNavigation/albumsNavigation';

type GallerySectionProps = {
  albumsData: AlbumData[];
};
const GallerySection = (props: GallerySectionProps) => {
  const { albumsData } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass>(null);

  const albums = albumsData?.map((album) => {
    return { img: album.cover || album.images[0], date: album.title };
  });

  const photos = albumsData?.[activeIndex]?.images.map((photo) => (
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
    <section className={s.gallerySection} id='gallery'>
      <Image src={'/radial-bg.webp'} alt='' fill className={s.gradient} />
      <h2>Галерея</h2>
      <div className={'fullContainer ' + s.background} role='presentation'>
        Наши воспоминания
      </div>
      <div className={s.galleryContainer}>
        <div>
          <AlbumsNavigation
            activeIndex={activeIndex}
            albums={albums}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <div className={s.mainInfo}>
          <div>
            <Swiper
              key={activeIndex} //need for correct render slides when activeStepIndex changes
              modules={[Keyboard, Navigation]}
              slidesPerView={'auto'}
              onSwiper={(swiper) => {
                handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>);
              }}
              keyboard
              className={s.slidesContainer}
              onSlideChange={() => swiperRef.current?.update()}
            >
              {photos}
            </Swiper>
          </div>
          <div className={s.descriptionBlock}>
            <p className={s.description}>{albumsData?.[activeIndex]?.description}</p>
            <NavButtons
              swiperRef={swiperRef}
              className={s.navButtons}
              key={`nav-buttons-${activeIndex}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default GallerySection;
