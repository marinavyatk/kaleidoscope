import s from './footer.module.scss';
import Logo from '../../assets/logo.svg';
import WhatsUpIcon from '../../assets/social-media-icons/whats-up.svg';
import RutubeIcon from '../../assets/social-media-icons/rutube.svg';
import YoutubeIcon from '../../assets/social-media-icons/youtube.svg';
import VKIcon from '../../assets/social-media-icons/vk.svg';
import TelegramIcon from '../../assets/social-media-icons/telegram.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import { formatPhoneNumber } from '@/common/commonFunctions';

type FooterProps = {
  tels: string[];
  emails: string[];
  socialLinks: Record<string, string>;
};

export const Footer = (props: FooterProps) => {
  const { tels, emails, socialLinks } = props;
  return (
    <footer className={s.footer} id='contacts'>
      <div className={s.footerContent}>
        <div className={s.footerLeft}>
          <p>ИП Резник Александр Александрович</p>
          <p className={s.inn}>ИНН: 230808907002</p>
          <p className={s.address}>
            350089, Краснодарский край, г.&nbsp;Краснодар, проспект Чекистов, дом&nbsp;23,
            оф.&nbsp;226
          </p>
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
          {tels?.map((tel) => {
            return (
              <a href={`tel:${tel}`} className={s.tel} key={tel}>
                {formatPhoneNumber(tel)}
              </a>
            );
          })}
          {emails?.map((email) => {
            return (
              <a href={`mailto:${email}`} className={s.email} key={email}>
                {email}
              </a>
            );
          })}

          <div className={s.links}>
            {socialLinks?.whatsapp && (
              <a
                href={socialLinks.whatsapp}
                className={s.link}
                rel='nofollow'
                target={'_blank'}
                aria-label='Мы в WhatsApp'
              >
                <WhatsUpIcon />
              </a>
            )}
            {socialLinks?.rutube && (
              <a
                href={socialLinks.rutube}
                className={s.link}
                rel='nofollow'
                target={'_blank'}
                aria-label='Мы на Rutube'
              >
                <RutubeIcon />
              </a>
            )}
            {socialLinks?.youtube && (
              <a
                href={socialLinks.youtube}
                className={s.link}
                rel='nofollow'
                target={'_blank'}
                aria-label='Мы на Youtube'
              >
                <YoutubeIcon />
              </a>
            )}
            {socialLinks?.vk && (
              <a
                href={socialLinks.vk}
                className={s.link + ' ' + s.telegram}
                rel='nofollow'
                target={'_blank'}
                aria-label='Мы ВКонтакте'
              >
                <VKIcon />
              </a>
            )}
            {socialLinks?.telegram && (
              <a
                href={socialLinks.telegram}
                className={s.link + ' ' + s.telegram}
                rel='nofollow'
                target={'_blank'}
                aria-label='Мы в telegram'
              >
                <TelegramIcon />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={s.footerBottom}>
        <div className={s.bottomLinks}>
          <a href='/privacy-policy.pdf' target='_blank' rel='nofollow'>
            Политика конфиденциальности
          </a>
          <span>
            Разработано в{' '}
            <a href='https://octoweb.ru/' target='_blank' rel='nofollow'>
              OctoWeb
            </a>
          </span>
        </div>
        <p>© 2024 «Калейдоскоп игр» — Все права защищены</p>
      </div>
    </footer>
  );
};
