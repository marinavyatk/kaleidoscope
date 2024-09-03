import s from './burgerButton.module.scss';
import { ComponentProps } from 'react';

export type BurgerButtonProps = ComponentProps<'input'>;
export const BurgerButton = (props: BurgerButtonProps) => {
  const { onChange, checked } = props;

  return (
    <div className={s.burgerButton}>
      <input
        className={s.checkbox}
        type='checkbox'
        name=''
        id=''
        onChange={onChange}
        checked={checked}
      />
      <div className={s.hamburgerLines}>
        <span className={s.line1}></span>
        <span className={s.line2}></span>
        <span className={s.line3}></span>
      </div>
    </div>
  );
};
