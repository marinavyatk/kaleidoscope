import { Button } from '@/components/button/button';
import s from './mainSection.module.scss';
import { memo, useRef } from 'react';
import { Animation } from '@/components/animations/animation';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';
import { usePreloadImages } from '@/common/customHooks/usePreloadImages';
import { Nullable } from '@/common/types';

const MainSection = () => {
  const animationRef = useRef<Nullable<HTMLDivElement>>(null);
  const shouldPlayAnimation = useIntersectionObserver(animationRef, 0.3);
  const images = usePreloadImages({ animation: 'waving', imgQty: 96, reverse: false });

  return (
    <section
      className={s.mainSection}
      ref={animationRef}
      itemScope
      itemType='https://schema.org/Organization'
    >
      <div className={s.background + ' fullContainer backgroundImg'}></div>
      {images.length && shouldPlayAnimation ? (
        <Animation images={images} ms={40} loop />
      ) : (
        <div className={s.kids + ' fullContainer backgroundImg'} />
      )}
      <h1 itemProp='name'>Калейдоскоп ИГР</h1>
      <p>Производим уникальные изделия для развития спортивного будущего!</p>
      <Button as='a' href='#catalog'>
        Смотреть все изделия
      </Button>
    </section>
  );
};

export default memo(MainSection);
