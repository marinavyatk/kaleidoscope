import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { MutableRefObject, useRef, useState } from 'react';
import { handleSwiper } from '@/common/commonFunctions';
import { Keyboard, Navigation } from 'swiper/modules';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { Timeline } from '@/components/timeline/timeline';
import { NavButtons } from '@/components/navButtons/navButtons';
import s from './projectMapSection.module.scss';
import { useProjectMap } from '@/common/customHooks/useProjectMap';
import Image from 'next/image';
import { Picture } from '@/components/picture/picture';
import { useScreenWidth } from '@/common/customHooks/useScreenWidth';

const ProjectMapSection = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const swiperRef = useRef<SwiperClass>(null);
  const isTablet = useScreenWidth(1439, 768);
  const { projectMap, stepData } = useProjectMap();

  const stepPhotos = projectMap?.[activeStepIndex]?.gallery.map((photo) => (
    <SwiperSlide key={photo.url} className={s.slide}>
      <ViewCloserModal
        imgSrc={photo.url}
        trigger={
          <Picture
            component={Image}
            src={photo.url}
            alt=''
            fill
            sizes='404px'
            containerComponent={'button'}
            containerProps={{ 'aria-label': 'Посмотреть', className: s.stepPhoto }}
          />
        }
      />
    </SwiperSlide>
  ));

  return (
    <section className={s.projectMapSection} id='history'>
      <h2>карта проекта</h2>
      <h3>{projectMap?.[activeStepIndex]?.title}</h3>
      <div className={s.background} role='presentation'>
        <span>идея</span>
        <span>и миссия</span>
      </div>
      <div className={s.description}>
        <p>{projectMap?.[activeStepIndex]?.description}</p>
        {isTablet && (
          <NavButtons
            swiperRef={swiperRef}
            className={s.navButtons}
            key={`nav-tablet-buttons-${activeStepIndex}`}
          />
        )}
      </div>
      <Swiper
        key={activeStepIndex} //need for correct render slides when activeStepIndex changes
        modules={[Keyboard, Navigation]}
        slidesPerView={'auto'}
        onSwiper={(swiper) => {
          handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>);
        }}
        keyboard
        className={s.slidesContainer}
        onSlideChange={() => swiperRef.current?.update()}
      >
        {stepPhotos}
      </Swiper>
      {!isTablet && (
        <NavButtons
          swiperRef={swiperRef}
          className={s.navButtons}
          key={`nav-buttons-${activeStepIndex}`}
        />
      )}
      <Timeline
        stepsData={stepData || undefined}
        activeStepIndex={activeStepIndex}
        setActiveStepIndex={setActiveStepIndex}
      />
    </section>
  );
};
export default ProjectMapSection;
