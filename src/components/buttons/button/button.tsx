import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactElement, Ref } from 'react';
import ButtonBackground from '../../../assets/btn-with-shadow.svg';
import { clsx } from 'clsx';
import s from './button.module.scss';

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
} & { ref?: Ref<HTMLElement> } & ComponentPropsWithoutRef<T>;

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: Ref<HTMLElement>) => {
    const { as: Component = 'button', className, ...restProps } = props;

    const classNames = clsx(s.button, className);

    return (
      <Component className={classNames} {...restProps} ref={ref}>
        <ButtonBackground className={'fullContainer ' + s.btnBackground} />
        <span>{restProps.children}</span>
      </Component>
    );
  },
) as <T extends ElementType = 'button'>(
  props: { ref?: Ref<HTMLElement> } & ButtonProps<T>,
) => ReactElement;
