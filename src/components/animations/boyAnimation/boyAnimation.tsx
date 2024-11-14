import { Animation } from '@/components/animations/animation';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';
import { usePreloadMobileImages } from '@/common/customHooks/usePreloadImages';
import { Ref } from 'react';
import Image from 'next/image';

type BoyAnimationProps = {
  containerRef: Ref<HTMLDivElement>;
};
export const BoyAnimation = (props: BoyAnimationProps) => {
  const { containerRef } = props;

  const isVisible = useIntersectionObserver(containerRef, 0.3);
  const images = usePreloadMobileImages({ animation: 'boy-animation', imgQty: 50, reverse: false });

  return (
    <div>
      {isVisible ? (
        <Animation images={images} ms={140} />
      ) : (
        <Image src={'/boy-animation/1.webp'} alt='Мальчик' fill />
      )}
    </div>
  );
};
