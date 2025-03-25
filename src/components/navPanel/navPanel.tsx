import { clsx } from 'clsx';
import s from './navPanel.module.scss';
import Arrow from '@/assets/arrow-up.svg';
import { ProgressBar } from '@/components/progressBar/progressBar';
import { ComponentPropsWithoutRef } from 'react';

type NavPanelProps = {
  itemsLength: number;
  onBackClick: () => void;
  onForwardClick: () => void;
  activeIndex: number;
} & ComponentPropsWithoutRef<'div'>;

export const NavPanel = (props: NavPanelProps) => {
  const { itemsLength, onBackClick, onForwardClick, activeIndex, className, ...restProps } = props;
  const classNames = clsx(s.navPanel, className, !itemsLength && s.hidden);
  return (
    <div className={classNames} {...restProps}>
      <button
        className={s.btnPrev}
        onClick={onBackClick}
        aria-label={'Назад'}
        disabled={itemsLength <= 1}
      >
        <Arrow />
      </button>
      <ProgressBar currentSlide={activeIndex + 1} total={itemsLength} />
      <button
        className={s.btnNext}
        onClick={onForwardClick}
        aria-label={'Вперёд'}
        disabled={itemsLength <= 1}
      >
        <Arrow />
      </button>
    </div>
  );
};
