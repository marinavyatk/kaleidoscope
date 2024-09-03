import { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import s from './accordionButton.module.scss';

export type AccordionButtonProps = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
} & ComponentPropsWithoutRef<'button'>;

export const AccordionButton = (props: AccordionButtonProps) => {
  const { opened, setOpened, className, ...restProps } = props;
  const classNames = clsx(s.buttonContainer, className, { [s.opened]: opened });

  return (
    <button
      {...restProps}
      className={classNames}
      onClick={() => setOpened(!opened)}
      aria-label={opened ? 'Свернуть' : 'Развернуть'}
    >
      <div className={s.closedBackground}></div>
      <div className={s.horizontal}></div>
      <div className={s.vertical}></div>
    </button>
  );
};
