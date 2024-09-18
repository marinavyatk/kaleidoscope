import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { handleSwiper } from '@/common/commonFunctions';
import { Keyboard, Navigation } from 'swiper/modules';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { Timeline } from '@/components/timeline/timeline';
import 'swiper/scss';
import { NavButtons } from '@/components/navButtons/navButtons';
import s from './projectMapSection.module.scss';
import { useProjectMap } from '@/common/customHooks/useProjectMap';
import Image from 'next/image';

export const ProjectMapSection = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const swiperRef = useRef<SwiperClass>(null);
  const [isTablet, setIsTablet] = useState(false);

  const { projectMap, stepData } = useProjectMap();

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1439);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stepPhotos = projectMap?.[activeStepIndex]?.gallery.map((photo) => (
    <SwiperSlide key={photo.url} className={s.slide}>
      <ViewCloserModal
        imgSrc={photo.url}
        trigger={
          <button className={s.stepPhoto} aria-label={'Посмотреть'}>
            <Image src={photo.url} alt='' fill sizes='404px' />
          </button>
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
