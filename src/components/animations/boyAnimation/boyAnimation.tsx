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
  const images = usePreloadMobileImages({ animation: 'boy', imgQty: 250, reverse: false });

  return (
    <>
      {isVisible ? (
        // <Animation images={images} ms={50} />
        <video src={'/boy.webm'} autoPlay></video>
      ) : (
        // <Image src={'/boy-animation/1.webp'} alt='Мальчик' fill />
        <Image src={'/boy/0001.webp'} alt='Мальчик' fill />
      )}
    </>
  );
};
