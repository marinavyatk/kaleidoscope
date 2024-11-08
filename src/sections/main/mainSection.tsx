import { Button } from '@/components/button/button';
import s from './mainSection.module.scss';
import { memo, useRef } from 'react';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';
import { Nullable } from '@/common/types';
import { WavingAnimation } from '@/components/animations/wavingAnimation/wavingAnimation';

const MainSection = () => {
  const animationRef = useRef<Nullable<HTMLDivElement>>(null);
  const isVisible = useIntersectionObserver(animationRef, 0.3, true);

  return (
    <section
      className={s.mainSection}
      ref={animationRef}
      itemScope
      itemType='https://schema.org/Organization'
    >
      <div className={s.background + ' fullContainer backgroundImg'}></div>
      {isVisible && <WavingAnimation containerRef={animationRef} />}
      <h1 itemProp='name'>Калейдоскоп ИГР</h1>
      <p>Производим уникальные изделия для развития спортивного будущего!</p>
      <Button as='a' href='#catalog'>
        Смотреть все изделия
      </Button>
    </section>
  );
};

export default memo(MainSection);
