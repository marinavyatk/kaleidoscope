import { Animation } from '@/components/animations/animation';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';
import { usePreloadMobileImages } from '@/common/customHooks/usePreloadImages';
import { memo, Ref, useEffect, useState } from 'react';
import Image from 'next/image';

export type BoyAnimationProps = {
  containerRef: Ref<HTMLDivElement>;
};

function BoyAnimation(props: BoyAnimationProps) {
  const { containerRef } = props;
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const isVisible = useIntersectionObserver(containerRef, 0.1);
  const images = usePreloadMobileImages({ animation: 'boy', imgQty: 250, reverse: false });

  useEffect(() => {
    if (images && images.length > 0) {
      setImagesLoaded(true);
    }
  }, [images]);

  if (!imagesLoaded) {
    return <Image src={'/boy/0001.webp'} alt='Мальчик' fill />;
  }

  return (
    <>
      {isVisible ? (
        <Animation images={images} ms={50} />
      ) : (
        <Image src={'/boy/0001.webp'} alt='Мальчик' fill />
      )}
    </>
  );
}

export default memo(BoyAnimation);
