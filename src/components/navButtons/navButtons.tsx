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
    if (swiperRef.current) {
      const updateButtonState = () => {
        if (swiperRef.current) {
          setIsBeginning(swiperRef.current.isBeginning);
          setIsEnd(swiperRef.current.isEnd);
        }
      };
      swiperRef.current.on('resize', updateButtonState);
      swiperRef.current.on('reachBeginning', updateButtonState);
      swiperRef.current.on('reachEnd', updateButtonState);
      updateButtonState();

      return () => {
        swiperRef?.current?.off('resize', updateButtonState);
        swiperRef?.current?.off('reachBeginning', updateButtonState);
        swiperRef?.current?.off('reachEnd', updateButtonState);
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
