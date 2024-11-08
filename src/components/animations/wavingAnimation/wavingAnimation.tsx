import { Ref } from 'react';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';
import { usePreloadImages } from '@/common/customHooks/usePreloadImages';
import { Animation } from '@/components/animations/animation';
import s from './wavingAnimation.module.scss';

type WavingAnimationProps = {
  containerRef: Ref<HTMLDivElement>;
};

export const WavingAnimation = (props: WavingAnimationProps) => {
  const { containerRef } = props;
  const shouldPlayAnimation = useIntersectionObserver(containerRef, 0.3);
  const images = usePreloadImages({ animation: 'waving', imgQty: 96, reverse: false });
  return (
    <>
      {images.length && shouldPlayAnimation ? (
        <Animation images={images} ms={40} loop />
      ) : (
        <div className={s.kids + ' fullContainer backgroundImg'} />
      )}
    </>
  );
};
