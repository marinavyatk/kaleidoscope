import s from './documentationSection.module.scss';
import { Button } from '@/components/button/button';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Keyboard, Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { ProgressBar } from '@/components/progressBar/progressBar';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { handleSwiper } from '@/common/commonFunctions';
import { NavButtons } from '@/components/navButtons/navButtons';
import { v4 as uuid } from 'uuid';
import { useDocuments } from '@/common/customHooks/useDocuments';

export const DocumentationSection = () => {
  const swiperRef = useRef<SwiperClass>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const documents = useDocuments();
  // const documents = [
  //   { title: { rendered: 'Документ 1' }, thumbnail_url: '' },
  //   { title: { rendered: 'Документ 2' }, thumbnail_url: '' },
  //   { title: { rendered: 'Документ 3' }, thumbnail_url: '' },
  // ];
  const isDocsExist = documents && documents.length;

  const slideNumber = currentSlide + 1 < 10 ? `0${currentSlide + 1}` : currentSlide + 1;
  const docs =
    isDocsExist &&
    documents?.map((doc) => {
      return (
        <SwiperSlide key={uuid()}>
          <div className={s.docInfo}>
            <div>
              <div className={s.imgContainer}>
                <img src={doc?.thumbnail_url} alt='' />
              </div>
            </div>
            <div className={s.description}>
              <p>{doc?.title?.rendered}</p>
              <ViewCloserModal
                imgSrc={doc?.thumbnail_url || ''}
                trigger={<Button>Открыть</Button>}
              />
            </div>
          </div>
        </SwiperSlide>
      );
    });

  return (
    <section className={s.docSection}>
      <h2>документация</h2>
      <div className={s.background}>документация</div>
      {isDocsExist && (
        <>
          <Swiper
            modules={[Keyboard, Navigation]}
            onSwiper={(swiper) => handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>)}
            keyboard
            onSlideChange={(swiper) => {
              console.log('SlidChange swipper', swiper);
              setCurrentSlide(swiper.activeIndex);
            }}
          >
            {docs}
          </Swiper>

          <div className={s.navPanel}>
            <span>{slideNumber}</span>
            <ProgressBar currentSlide={currentSlide + 1} total={documents.length} />

            <NavButtons swiperRef={swiperRef} />
          </div>
        </>
      )}
    </section>
  );
};
