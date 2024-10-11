import { ComponentPropsWithoutRef, memo, ReactNode, useEffect, useState } from 'react';
import s from './header.module.scss';
import Logo from '../../assets/logo.svg';
import Headroom from 'react-headroom';
import { BurgerButton } from '../burgerButton/burgerButton';
import { useScreenWidth } from '@/common/customHooks/useScreenWidth';

export type HeaderProps = {
  player: ReactNode;
} & ComponentPropsWithoutRef<'header'>;

const Header = (props: HeaderProps) => {
  const { player, className, ...restProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const isTabletOrMobile = useScreenWidth(1099);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <Headroom className={className}>
      <div className={s.headerContainer + ' ' + s.headerMobile}>
        <header {...restProps} className={s.header}>
          {!isTabletOrMobile && (
            <div className={s.links}>
              <a href='#about'>О нас</a>
              <a href='#catalog'>Каталог</a>
              <a href='#gallery'>Галерея</a>
              <a href='#realized'>Реализовано</a>
            </div>
          )}
          <Logo className={s.logo} />
          <div className={s.rightBlock}>
            {!isTabletOrMobile && <a href='#contacts'>Контакты</a>}
            <div className={s.player}>{player}</div>
          </div>
          {isTabletOrMobile && (
            <BurgerButton onChange={() => setIsOpen((prev) => !prev)} checked={isOpen} />
          )}
        </header>
        {isTabletOrMobile && (
          <>
            <div className={s.background}></div>
            <div className={s.links}>
              <div className={s.linksBackground}>
                <a href='#about' onClick={() => setIsOpen(false)}>
                  О нас
                </a>
                <a href='#catalog' onClick={() => setIsOpen(false)}>
                  Каталог
                </a>
                <a href='#gallery' onClick={() => setIsOpen(false)}>
                  Галерея
                </a>
                <a href='#realized' onClick={() => setIsOpen(false)}>
                  Реализовано
                </a>
                <a href='#contacts' onClick={() => setIsOpen(false)}>
                  Контакты
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </Headroom>
  );
};

export default memo(Header);
