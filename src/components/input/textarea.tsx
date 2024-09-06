import React, { ComponentPropsWithoutRef, Ref } from 'react';
import clsx from 'clsx';
import s from './input.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

export type InputProps = {
  label: string;
  containerProps?: ComponentPropsWithoutRef<'div'>;
  error?: boolean;
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'style'>;

export const Textarea = React.forwardRef((props: InputProps, ref: Ref<HTMLTextAreaElement>) => {
  const { label, error, containerProps, className, ...restProps } = props;
  const classNames = clsx(s.inputContainer, className, containerProps?.className, {
    [s.error]: error,
  });

  return (
    <div {...containerProps} className={classNames}>
      <label htmlFor={restProps?.name} className={s.label}>
        {label}
      </label>
      <TextareaAutosize
        {...restProps}
        className={s.input}
        name={restProps?.name}
        id={restProps?.name}
        ref={ref}
      ></TextareaAutosize>
    </div>
  );
});
