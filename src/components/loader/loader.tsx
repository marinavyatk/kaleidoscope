import s from './loader.module.scss';
import { clsx } from 'clsx';
import { ComponentProps } from 'react';

export type LoaderProps = {
  lightBackground?: boolean;
} & ComponentProps<'span'>;
export const Loader = (props: LoaderProps) => {
  const { lightBackground = false, className, ...restProps } = props;
  return (
    <span className={clsx(s.loader, className, lightBackground && s.lightBg)} {...restProps}></span>
  );
};
