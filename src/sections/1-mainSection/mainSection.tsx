import { Button } from '@/components/button/button';
import s from './mainSection.module.scss';
import Image from 'next/image';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { Animation } from '@/components/animations/animation';

export const MainSection = () => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const preloadImages = (numFrames: number) => {
      const promises = Array.from({ length: numFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new window.Image();
          let imgSrc = '';
          if (screenWidth >= 768) {
            imgSrc = `/waving/desktop/${i.toString().padStart(5, '0')}.png.webp`;
          } else if (screenWidth >= 480) {
            imgSrc = `/waving/tablet/${i.toString().padStart(5, '0')}.png.webp`;
          } else {
            imgSrc = `/waving/mobile/${i.toString().padStart(5, '0')}.png.webp`;
          }
          img.src = imgSrc;
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${imgSrc}`));
        });
      });

      Promise.all(promises)
        .then(setImages)
        .catch((err) => console.error('Image preload error:', err));
    };

    preloadImages(176);
  }, []);

  return (
    <section className={s.mainSection}>
      <Image src={'/main-section-bg.webp'} alt='' fill quality={100} className={s.background} />
      {images.length ? (
        <Animation images={images} ms={50} loop repeatInterval={5000} />
      ) : (
        <div className={clsx(s.kids, 'fullContainer')} />
      )}

      <h1>Калейдоскоп ИГР</h1>
      <p>Производим уникальные изделия для развития спортивного будущего!</p>
      <Button as='a' href='#catalog'>
        Смотреть все изделия
      </Button>
    </section>
  );
};
