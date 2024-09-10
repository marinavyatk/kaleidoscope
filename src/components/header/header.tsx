import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import s from './header.module.scss';
import Logo from '../../assets/logo.svg';
import Headroom from 'react-headroom';
import { BurgerButton } from '../burgerButton/burgerButton';
import { Player } from '../player/player';

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

export const Header = (props: HeaderProps) => {
  const { className, ...restProps } = props;
  const [isClient, setIsClient] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsTabletOrMobile(window.innerWidth <= 1099);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isClient) return null;

  return (
    <Headroom className={className} ref={headerRef}>
      <div className={s.headerContainer}>
        {!isTabletOrMobile ? (
          <header {...restProps} className={s.header}>
            <div className={s.links}>
              <a href='#about'>О нас</a>
              <a href='#catalog'>Каталог</a>
              <a href='#history'>История</a>
              {/*need later*/}
              {/*<a href='#realized'>Реализовано</a>*/}
            </div>
            <Logo className={s.logo} />
            <div className={s.rightBlock}>
              <a href='#contacts'>Контакты</a>
              <div className={s.player}>
                <Player />
              </div>
            </div>
          </header>
        ) : (
          <div className={s.headerMobile} ref={menuRef}>
            <header className={s.header}>
              <Logo className={s.logo} />
              <div className={s.player}>
                <Player />
              </div>
              <BurgerButton onChange={() => setIsOpen((prev) => !prev)} checked={isOpen} />
            </header>
            <div className={s.background}></div>
            <div className={s.links}>
              <div className={s.linksBackground}>
                <a href='#about' onClick={() => setIsOpen(false)}>
                  О нас
                </a>
                <a href='#catalog' onClick={() => setIsOpen(false)}>
                  Каталог
                </a>
                <a href='#history' onClick={() => setIsOpen(false)}>
                  История
                </a>
                {/*need later*/}
                {/*<a href='#realized' onClick={() => setIsOpen(false)}>*/}
                {/*  Реализовано*/}
                {/*</a>*/}
                <a href='#contacts' onClick={() => setIsOpen(false)}>
                  Контакты
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Headroom>
  );
};
