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

  return (
    <div className={classNames} {...restProps}>
      <button
        className={s.btnPrev}
        onClick={() => handlePrevButtonClick(swiperRef as MutableRefObject<SwiperClass>)}
        aria-label={'Назад'}
      >
        <Arrow />
      </button>
      <button
        className={s.btnNext}
        onClick={() => handleNextButtonClick(swiperRef as MutableRefObject<SwiperClass>)}
        aria-label={'Вперёд'}
      >
        <Arrow />
      </button>
    </div>
  );
};
