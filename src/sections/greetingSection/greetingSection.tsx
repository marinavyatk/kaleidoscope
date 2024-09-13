import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { DebAnimation } from '@/components/animations/debAnimation/debAnimation';
import { Button } from '@/components/button/button';
import s from './greetingSection.module.scss';
import Image from 'next/image';

export const GreetingSection = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const handleButtonClick = () => {
    if (images.length) {
      setShowAnimation((prev) => !prev);
    }
  };

  useEffect(() => {
    const preloadImages = async (numFrames: number) => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < numFrames; i++) {
        const img = new window.Image();
        const imgSrc = `/deb/${i.toString().padStart(5, '0')}.png.webp`;
        img.src = imgSrc;

        img.onload = () => {
          loadedCount++;
          loadedImages[i] = img;
          if (loadedCount === numFrames) {
            setImages(loadedImages);
          }
        };

        img.onerror = (err) => {
          console.error(`Failed to load image: ${imgSrc}`, err);
        };
      }
    };

    preloadImages(36);
  }, []);

  return (
    <section className={s.greetingSection}>
      <div className={s.bgContainer}>
        <Image
          src={'/main-section-bg.webp'}
          alt=''
          fill
          quality={100}
          priority
          className={s.background}
        />
      </div>
      {!showAnimation ? (
        <Image
          src={'/deb/00000.png.webp'}
          alt=''
          fill
          quality={100}
          priority
          className={clsx(s.kids, showAnimation && s.hidden)}
        />
      ) : (
        <DebAnimation images={images} />
      )}

      <div className={s.firstLine}>Привет, чемпион!</div>
      <div className={s.secondLine}>Ну что, приступим?</div>
      <Button onClick={handleButtonClick}>поехали!</Button>
    </section>
  );
};
