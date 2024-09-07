import s from './footer.module.scss';
import Logo from '../../assets/logo.svg';
import WhatsUpIcon from '../../assets/social-media-icons/whats-up.svg';
import RutubeIcon from '../../assets/social-media-icons/rutube.svg';
import YoutubeIcon from '../../assets/social-media-icons/youtube.svg';
import VKIcon from '../../assets/social-media-icons/vk.svg';
import TelegramIcon from '../../assets/social-media-icons/telegram.svg';
import ArrowUp from '../../assets/arrow-up.svg';

export const Footer = () => {
  return (
    <footer className={s.footer} id='contacts'>
      <div className={s.footerContent}>
        <div className={s.footerLeft}>
          <p>ИП Резник Александр Александрович</p>
          <p className={s.inn}>ИНН: 230808907002</p>
          <p className={s.city}>Краснодар</p>
          <p className={s.address}>350012, Майский проезд, 22, Россия</p>
        </div>

        <div className={s.footerCenter}>
          <Logo className={s.logo} />
          <a href='#top' aria-label={'Перейти вверх страницы'}>
            <div className={s.arrowUp}>
              <ArrowUp />
            </div>
            НАВЕРХ
          </a>
        </div>

        <div className={s.footerRight}>
          <a href='tel:+79184175023' className={s.tel}>
            +7 918 417-50-23
          </a>
          <a href='tel:+79891402525' className={s.tel}>
            +7 989 140-25-25
          </a>
          <a href='mailto:info@kaleidoscope-games.ru' className={s.email}>
            info@kaleidoscope-games.ru
          </a>
          <div className={s.links}>
            {/*need if it will be more links*/}
            {/*<a href='#' className={s.link} rel='nofollow' aria-label={'Мы в WhatsUp'}>*/}
            {/*  <WhatsUpIcon />*/}
            {/*</a>*/}
            {/*<a href='#' className={s.link} rel='nofollow' aria-label={'Мы на Rutube'}>*/}
            {/*  <RutubeIcon />*/}
            {/*</a>*/}
            {/*<a href='#' className={s.link} rel='nofollow' aria-label={'МЫ на Youtube'}>*/}
            {/*  <YoutubeIcon />*/}
            {/*</a>*/}
            {/*<a href='#' className={s.link} rel='nofollow' aria-label={'Мы ВКонтакте'}>*/}
            {/*  <VKIcon />*/}
            {/*</a>*/}
            <a
              href='https://t.me/kaleidoscopegames'
              className={s.link + ' ' + s.telegram}
              rel='nofollow'
              target={'_blank'}
              aria-label={'Мы в телеграмме'}
            >
              <TelegramIcon />
            </a>
          </div>
        </div>
      </div>
      <div className={s.footerBottom}>
        <a href='#'>Политика конфиденциальности</a>
        <p>© 2024 «Калейдоскоп игр» — Все права защищены</p>
      </div>
    </footer>
  );
};
