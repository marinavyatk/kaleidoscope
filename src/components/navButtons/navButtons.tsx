import s from './navButtons.module.scss';
import { handleNextButtonClick, handlePrevButtonClick } from '@/common/commonFunctions';
import { ComponentPropsWithoutRef, MutableRefObject, RefObject, useEffect, useState } from 'react';
import { SwiperClass } from 'swiper/react';
import { clsx } from 'clsx';
import Arrow from '../../assets/arrow-up.svg';

export type NavButtonsProps = {
  swiperRef: RefObject<SwiperClass>;
} & ComponentPropsWithoutRef<'div'>;

export const NavButtons = (props: NavButtonsProps) => {
  const { swiperRef, className, ...restProps } = props;
  const classNames = clsx(s.navButtons, className);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const currentRef = swiperRef.current;
    if (currentRef) {
      const updateButtonState = () => {
        if (currentRef) {
          setIsBeginning(currentRef.isBeginning);
          setIsEnd(currentRef.isEnd);
        }
      };
      currentRef.on('resize', updateButtonState);
      currentRef.on('reachBeginning', updateButtonState);
      currentRef.on('reachEnd', updateButtonState);
      updateButtonState();

      return () => {
        currentRef?.off('resize', updateButtonState);
        currentRef?.off('reachBeginning', updateButtonState);
        currentRef?.off('reachEnd', updateButtonState);
      };
    }
  }, [swiperRef]);

  return (
    <div className={classNames} {...restProps}>
      <button
        className={s.btnPrev}
        onClick={() => handlePrevButtonClick(swiperRef as MutableRefObject<SwiperClass>)}
        aria-label={'Назад'}
        disabled={isBeginning}
      >
        <Arrow />
      </button>
      <button
        className={s.btnNext}
        onClick={() => handleNextButtonClick(swiperRef as MutableRefObject<SwiperClass>)}
        aria-label={'Вперёд'}
        disabled={isEnd}
      >
        <Arrow />
      </button>
    </div>
  );
};
