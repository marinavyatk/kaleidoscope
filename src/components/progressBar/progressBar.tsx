import s from './progressBar.module.scss';
import { ComponentProps, useEffect, useRef } from 'react';
import { clsx } from 'clsx';

export type ProgressBarProps = {
  total: number;
  currentSlide: number;
} & ComponentProps<'div'>;

export const ProgressBar = (props: ProgressBarProps) => {
  const { total, currentSlide, className, ...restProps } = props;
  const classNames = clsx(s.progressBar, className);
  const progressRef = useRef<HTMLDivElement>(null);
  const progress = (currentSlide / total) * 100;

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }
  }, [currentSlide, total]);

  return (
    <div className={classNames} {...restProps}>
      <div className={s.progress} ref={progressRef}></div>
    </div>
  );
};
