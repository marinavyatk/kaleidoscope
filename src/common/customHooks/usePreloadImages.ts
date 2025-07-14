import { useEffect, useState } from 'react';

type HandleSettledImagesArgs = {
  promises: Promise<HTMLImageElement>[];
  reverse: boolean;
  setImages: (images: HTMLImageElement[]) => void;
};

export const handleSettledImages = ({ promises, reverse, setImages }: HandleSettledImagesArgs) => {
  Promise.allSettled(promises).then((results) => {
    const successfulImages = results
      .filter(
        (result): result is PromiseFulfilledResult<HTMLImageElement> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);

    if (reverse) {
      const reversedImages = successfulImages.slice().reverse();
      setImages([...successfulImages, ...reversedImages]);
    } else {
      setImages(successfulImages);
    }
  });
};

type Args = {
  animation: string;
  imgQty: number;
  reverse: boolean;
};

export const usePreloadImages = ({ animation, imgQty, reverse }: Args) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const preloadImages = (numFrames: number) => {
      const promises = Array.from({ length: numFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new window.Image();
          let imgSrc = '';
          if (screenWidth > 768) {
            imgSrc = `/${animation}/desktop/${i + 1}.webp`;
          } else if (screenWidth >= 480) {
            imgSrc = `/${animation}/tablet/${i + 1}.webp`;
          } else {
            imgSrc = `/${animation}/mobile/${i + 1}.webp`;
          }
          img.src = imgSrc;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${imgSrc}`));
        });
      });

      handleSettledImages({ promises, reverse, setImages });
    };

    preloadImages(imgQty);
  }, []);

  return images;
};

export const usePreloadMobileImages = ({ animation, imgQty, reverse }: Args) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const preloadImages = (numFrames: number) => {
      const promises = Array.from({ length: numFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new window.Image();
          const imgSrc = `/${animation}/${(i + 1).toString().padStart(4, '0')}.webp`;
          img.src = imgSrc;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${imgSrc}`));
        });
      });

      handleSettledImages({ promises, reverse, setImages });
    };

    preloadImages(imgQty);
  }, []);

  return images;
};
