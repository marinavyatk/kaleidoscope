import { useEffect, useState } from 'react';
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
            imgSrc = `/${animation}/desktop/${(i + 1).toString()}.webp`;
          } else if (screenWidth >= 480) {
            imgSrc = `/${animation}/tablet/${(i + 1).toString()}.webp`;
          } else {
            imgSrc = `/${animation}/mobile/${(i + 1).toString()}.webp`;
          }
          img.src = imgSrc;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${imgSrc}`));
        });
      });

      Promise.all(promises)
        .then((images) => {
          if (reverse) {
            const reversedImages = images.slice().reverse();
            setImages([...images, ...reversedImages]);
          } else {
            setImages(images);
          }
        })
        .catch((err) => console.error('Image preload error:', err));
    };

    preloadImages(imgQty);
  }, []);

  return images;
};
