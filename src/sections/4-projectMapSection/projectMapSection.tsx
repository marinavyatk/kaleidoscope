import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import StepPhoto from '../../assets/step-photo.png';
import {MutableRefObject, useEffect, useRef} from 'react';
import { handleSwiper } from '@/common/commonFunctions';
import { Keyboard, Navigation } from 'swiper/modules';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { stepsData, Timeline } from '@/components/timeline/timeline';
import 'swiper/scss';
import { NavButtons } from '@/components/navButtons/navButtons';
import { useMediaQuery } from 'react-responsive';
import s from './projectMapSection.module.scss';
import {api} from '@/common/api';

const photos = [StepPhoto, StepPhoto, StepPhoto, StepPhoto, StepPhoto];

export const ProjectMapSection = () => {
  const swiperRef = useRef<SwiperClass>(null);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const stepPhotos = photos.map((photo, index) => {
    return (
      <SwiperSlide key={`photo-${index}`} className={s.slide}>
        <ViewCloserModal
          imgSrc={photo.src}
          trigger={<img src={photo.src} alt='' className={s.stepPhoto} />}
        />
      </SwiperSlide>
    );
  });


  useEffect(()=>{
      api.getProjectMap().then((data)=>console.log(data));
  }, [])
  return (
    <section className={s.projectMapSection} id='history'>
      <h2>карта проекта</h2>
      <div className={s.background}>
        идея <br />
        и&nbsp;миссия
      </div>
      <h3>2024 г.</h3>
      <div className={s.description}>
        <p>
          Реализована первая малая архитектурная форма КОРОБКА № с функцией развлекательно-игрового
          комплекса.
        </p>
        {isTablet && <NavButtons swiperRef={swiperRef} className={s.navButtons} />}
      </div>

      <Swiper
        modules={[Keyboard, Navigation]}
        slidesPerView={'auto'}
        spaceBetween={22}
        onSwiper={(swiper) => {
          handleSwiper(swiper, swiperRef as  MutableRefObject<SwiperClass>);
        }}
        keyboard
        loop
        className={s.slidesContainer}
      >
        {stepPhotos}
      </Swiper>
      {!isTablet && <NavButtons swiperRef={swiperRef} className={s.navButtons} />}
      <Timeline stepsData={stepsData} />
    </section>
  );
};
