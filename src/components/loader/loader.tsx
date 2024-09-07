import s from './loader.module.scss';
import { clsx } from 'clsx';
import { ComponentProps } from 'react';

type LoaderProps = ComponentProps<'span'>;
export const Loader = (props: LoaderProps) => {
  const { className, ...restProps } = props;
  return <span className={clsx(s.loader, className)} {...restProps}></span>;
};
