import s from './documentationSection.module.scss';
import { Button } from '@/components/button/button';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { MutableRefObject, useRef, useState } from 'react';
import { Keyboard, Navigation } from 'swiper/modules';
import { ProgressBar } from '@/components/progressBar/progressBar';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { handleSwiper } from '@/common/commonFunctions';
import { NavButtons } from '@/components/navButtons/navButtons';
import { v4 as uuid } from 'uuid';
import { useDocuments } from '@/common/customHooks/useDocuments';
import { Loader } from '@/components/loader/loader';
import { Picture } from '@/components/picture/picture';
import Image from 'next/image';

const DocumentationSection = () => {
  const swiperRef = useRef<SwiperClass>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { documents, loading } = useDocuments();
  const isDocsExist = documents && documents.length;

  const slideNumber = currentSlide + 1 < 10 ? `0${currentSlide + 1}` : currentSlide + 1;
  const docs =
    isDocsExist &&
    documents?.map((doc) => {
      return (
        <SwiperSlide key={uuid()}>
          <div className={s.docInfo}>
            <Picture
              src={doc?.thumbnail_url}
              alt={doc?.title.rendered}
              component={Image}
              containerProps={{ className: s.imgContainer }}
              fill
              sizes='(max-width: 767px) 288px, 604px'
            />
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
      <div className={s.background}>
        документац
        <wbr />
        ия
      </div>
      {isDocsExist ? (
        <>
          <Swiper
            modules={[Keyboard, Navigation]}
            onSwiper={(swiper) => handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>)}
            keyboard
            onSlideChange={(swiper) => {
              setCurrentSlide(swiper.activeIndex);
            }}
          >
            {docs}
          </Swiper>
          <div className={s.navPanelContainer}>
            <div className={s.navPanel}>
              <span>{slideNumber}</span>
              <ProgressBar currentSlide={currentSlide + 1} total={documents.length} />

              <NavButtons swiperRef={swiperRef} />
            </div>
            <div className={s.emptyElement}></div>
          </div>
        </>
      ) : (
        <div className={s.placeholder}>{loading && <Loader />}</div>
      )}
    </section>
  );
};

export default DocumentationSection;
