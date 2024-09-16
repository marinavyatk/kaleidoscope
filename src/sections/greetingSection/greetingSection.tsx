import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/button/button';
import s from './greetingSection.module.scss';
import { Animation } from '@/components/animations/animation';

type GreetingSectionProps = {
  setShowGreeting: (show: boolean) => void;
  setPlaying: (show: boolean) => void;
  className?: string;
};

export const GreetingSection = (props: GreetingSectionProps) => {
  const { setShowGreeting, setPlaying, className } = props;
  const [showAnimation, setShowAnimation] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [animationEnd, setAnimationEnd] = useState(false);
  const classNames = clsx(
    s.greetingSection,
    'fullContainer',
    animationEnd && s.hiddenSection,
    className,
  );

  const handleButtonClick = () => {
    if (images.length) {
      setShowAnimation((prev) => !prev);
    }
    setPlaying(true);
  };

  useEffect(() => {
    if (animationEnd) {
      setTimeout(() => {
        setShowGreeting(false);
        window.scroll({
          top: 0,
          behavior: 'instant',
        });
      }, 400);
    }
  }, [animationEnd]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const preloadImages = (numFrames: number) => {
      const promises = Array.from({ length: numFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new window.Image();
          let imgSrc = '';
          if (screenWidth >= 768) {
            imgSrc = `/greeting/desktop/${i.toString().padStart(5, '0')}.png.webp`;
          } else if (screenWidth >= 480) {
            imgSrc = `/greeting/tablet/${i.toString().padStart(5, '0')}.png.webp`;
          } else {
            imgSrc = `/greeting/mobile/${i.toString().padStart(5, '0')}.png.webp`;
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

    preloadImages(36);
  }, []);

  return (
    <section className={classNames}>
      <div className={clsx(s.innerContainer, 'mainContainer')}>
        <div className={clsx(s.background, showAnimation && s.hidden, 'fullContainer')}></div>
        {!showAnimation ? (
          <div className={clsx(s.kids, 'fullContainer')}></div>
        ) : (
          <Animation images={images} setAnimationEnd={setAnimationEnd} />
        )}
        <div className={clsx(s.firstLine, showAnimation && s.goLeft)}>Привет, чемпион!</div>
        <div className={clsx(s.secondLine, showAnimation && s.goRight)}>Ну что, приступим?</div>
        <Button onClick={handleButtonClick} className={clsx(showAnimation && s.goRight)}>
          Поехали!
        </Button>
      </div>
    </section>
  );
};
