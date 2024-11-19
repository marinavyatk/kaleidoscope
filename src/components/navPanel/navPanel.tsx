import { clsx } from 'clsx';
import s from './navPanel.module.scss';
import Arrow from '@/assets/arrow-up.svg';
import { ProgressBar } from '@/components/progressBar/progressBar';
import { ComponentPropsWithoutRef } from 'react';

type NavPanelProps = {
  items: any[];
  onBackClick: () => void;
  onForwardClick: () => void;
  activeIndex: number;
} & ComponentPropsWithoutRef<'div'>;

export const NavPanel = (props: NavPanelProps) => {
  const { items, onBackClick, onForwardClick, activeIndex, className, ...restProps } = props;
  const classNames = clsx(s.navPanel, className, !items.length && s.hidden);
  return (
    <div className={classNames} {...restProps}>
      <button
        className={s.btnPrev}
        onClick={onBackClick}
        aria-label={'Назад'}
        disabled={items.length <= 1}
      >
        <Arrow />
      </button>
      <ProgressBar currentSlide={activeIndex + 1} total={items.length} />
      <button
        className={s.btnNext}
        onClick={onForwardClick}
        aria-label={'Вперёд'}
        disabled={items.length <= 1}
      >
        <Arrow />
      </button>
    </div>
  );
};
