import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/buttons/button/button';
import s from './greetingSection.module.scss';
import { Animation } from '@/components/animations/animation';
import { usePreloadImages } from '@/common/customHooks/usePreloadImages';
import { Loader } from '@/components/loader/loader';

type GreetingSectionProps = {
  setShowGreeting: (show: boolean) => void;
  setPlaying: (show: boolean) => void;
  className?: string;
};

export const GreetingSection = (props: GreetingSectionProps) => {
  const { setShowGreeting, setPlaying, className } = props;
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationEnd, setAnimationEnd] = useState(false);
  const classNames = clsx(
    s.greetingSection,
    'fullContainer',
    'mainContainer',
    animationEnd && s.hiddenSection,
    className,
  );
  const images = usePreloadImages({ animation: 'greeting', imgQty: 20, reverse: false });

  const handleButtonClick = () => {
    if (images.length) {
      setShowAnimation(true);
      setPlaying(true);
    }
  };
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (animationEnd) {
      timeoutId = setTimeout(() => {
        setShowGreeting(false);
        window.scroll({
          top: 0,
          behavior: 'instant',
        });
      }, 400);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [animationEnd]);

  return (
    <section className={classNames}>
      <div className={s.innerContainer}>
        <div className={clsx(s.background, showAnimation && s.hidden, 'fullContainer')}>
          <div className={clsx(s.backgroundImg, 'fullContainer backgroundImg')}></div>
        </div>

        {!showAnimation ? (
          <div className={clsx(s.kids, 'fullContainer backgroundImg')}></div>
        ) : (
          <Animation images={images} setAnimationEnd={setAnimationEnd} ms={70} />
        )}
        <div className={clsx(s.firstLine, showAnimation && s.goLeft)}>Привет, чемпион!</div>
        <div className={clsx(s.secondLine, showAnimation && s.goRight)}>Ну что, приступим?</div>
        <Button onClick={handleButtonClick} className={clsx(showAnimation && s.goRight)}>
          <span className={!images.length ? s.hiddenSection : ''}>Поехали!</span>
          {!images.length && (
            <div className={'fullContainer'}>
              <Loader className={s.greetingLoader} />
            </div>
          )}
        </Button>
      </div>
    </section>
  );
};
