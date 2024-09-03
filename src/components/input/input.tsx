import React, { ComponentPropsWithoutRef, Ref } from 'react';
import clsx from 'clsx';
import s from './input.module.scss';
import InputMask from '@mona-health/react-input-mask';

export type InputProps = {
  label: string;
  errorMessage?: string | undefined;
  containerProps?: ComponentPropsWithoutRef<'div'>;
} & ComponentPropsWithoutRef<'input'>;

export const Input = React.forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  const { label, errorMessage, containerProps, className, ...restProps } = props;
  const classNames = clsx(s.inputContainer, className, containerProps?.className, {
    [s.error]: errorMessage,
  });

  return (
    <div {...containerProps} className={classNames}>
      <label htmlFor={restProps?.name} className={s.label}>
        {label}
      </label>
      {restProps.type === 'tel' ? (
        <InputMask
          mask='+7\ (999) 999-99-99'
          {...restProps}
          className={s.input}
          name={restProps?.name}
          id={restProps?.name}
          ref={ref}
        />
      ) : (
        <input
          {...restProps}
          className={s.input}
          name={restProps?.name}
          id={restProps?.name}
          ref={ref}
        />
      )}
      {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
    </div>
  );
});
