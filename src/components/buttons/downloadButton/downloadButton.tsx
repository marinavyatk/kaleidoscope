import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react';
import { clsx } from 'clsx';
import s from './downloadButton.module.scss';

export type ButtonProps = { ref?: Ref<HTMLAnchorElement> } & ComponentPropsWithoutRef<'a'>;

export const DownloadButton = forwardRef((props: ButtonProps, ref: Ref<HTMLAnchorElement>) => {
  const { className, ...restProps } = props;
  const classNames = clsx(s.button, className);

  return (
    <a className={classNames} {...restProps} ref={ref} download>
      <img srcSet='/download-button.png, /download-button-2x.png 2x' alt='' />
      <span className={s.text}>скачать рендеры</span>
    </a>
  );
});
