import { ComponentPropsWithoutRef, useState, useEffect, useRef } from 'react';
import s from './header.module.scss';
import Logo from '../../assets/logo.svg';
import Headroom from 'react-headroom';
import { BurgerButton } from '../burgerButton/burgerButton';
import { Player } from '../player/player';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export type HeaderProps = ComponentPropsWithoutRef<'header'>;

export const Header = (props: HeaderProps) => {
  const { className, ...restProps } = props;
  const [isClient, setIsClient] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsTabletOrMobile(window.innerWidth <= 1099);
        setIsMobile(window.innerWidth <= 567);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const menuElement = menuRef.current;
    if (isOpen && menuElement) {
      disableBodyScroll(menuElement);
    } else if (menuElement) {
      enableBodyScroll(menuElement);
    }

    return () => {
      if (menuElement) {
        enableBodyScroll(menuElement);
      }
    };
  }, [isOpen]);

  if (!isClient) return null;

  return (
    <Headroom className={className}>
      <div className={s.headerContainer}>
        {!isTabletOrMobile ? (
          <header {...restProps} className={s.header}>
            <div className={s.links}>
              <a href='#about'>О нас</a>
              <a href='#catalog'>Каталог</a>
              <a href='#history'>История</a>
              <a href='#realized'>Реализовано</a>
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
              {!isMobile && (
                <div className={s.player}>
                  <Player />
                </div>
              )}
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
                <a href='#realized' onClick={() => setIsOpen(false)}>
                  Реализовано
                </a>
                <a href='#contacts' onClick={() => setIsOpen(false)}>
                  Контакты
                </a>
              </div>
            </div>
            {isMobile && (
              <div className={s.player}>
                <Player />
              </div>
            )}
          </div>
        )}
      </div>
    </Headroom>
  );
};
