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

export const ProjectMapSection = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const swiperRef = useRef<SwiperClass>(null);
  const [isClient, setIsClient] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const { projectMap, stepData } = useProjectMap();

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1439);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stepPhotos = projectMap?.[activeStepIndex]?.gallery.map((photo, index) => (
    <SwiperSlide key={`photo-${index}`} className={s.slide}>
      <ViewCloserModal
        imgSrc={photo.url}
        trigger={<img src={photo.url} alt='' className={s.stepPhoto} />}
      />
    </SwiperSlide>
  ));

  if (!isClient) return null;

  return (
    <section className={s.projectMapSection} id='history'>
      <h2>карта проекта</h2>
      <div className={s.background}>
        идея <br />
        и&nbsp;миссия
      </div>
      <h3>{projectMap?.[activeStepIndex]?.title}</h3>
      <div className={s.description}>
        <p>{projectMap?.[activeStepIndex]?.description}</p>
        {isTablet && <NavButtons swiperRef={swiperRef} className={s.navButtons} />}
      </div>

      <Swiper
        modules={[Keyboard, Navigation]}
        slidesPerView={'auto'}
        onSwiper={(swiper) => {
          handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>);
        }}
        keyboard
        className={s.slidesContainer}
      >
        {stepPhotos}
      </Swiper>
      {!isTablet && <NavButtons swiperRef={swiperRef} className={s.navButtons} />}
      <Timeline
        stepsData={stepData || undefined}
        activeStepIndex={activeStepIndex}
        setActiveStepIndex={setActiveStepIndex}
      />
    </section>
  );
};
