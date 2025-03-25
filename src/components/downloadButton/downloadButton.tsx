import { ComponentPropsWithoutRef, forwardRef, ReactElement, Ref } from 'react';
import Logo from '../../assets/logo-white.svg';
import { clsx } from 'clsx';
import s from './downloadButton.module.scss';

export type ButtonProps = { ref?: Ref<HTMLAnchorElement> } & ComponentPropsWithoutRef<'a'>;

export const DownloadButton = forwardRef((props: ButtonProps, ref: Ref<HTMLAnchorElement>) => {
  const { className, ...restProps } = props;
  const classNames = clsx(s.button, className);

  return (
    <a className={classNames} {...restProps} ref={ref} download>
      <div className={s.logoContainer}>
        <Logo />
      </div>
      <span className={s.text}>скачать рендеры</span>
    </a>
  );
}) as (props: { ref?: Ref<HTMLElement> } & ButtonProps) => ReactElement;
