import s from './footer.module.scss';
import Logo from '../../assets/logo.svg';
import PinterestIcon from '../../assets/social-media-icons/pinterest.svg';
import WhatsUpIcon from '../../assets/social-media-icons/whats-up.svg';
import RutubeIcon from '../../assets/social-media-icons/rutube.svg';
import YoutubeIcon from '../../assets/social-media-icons/youtube.svg';
import VKIcon from '../../assets/social-media-icons/vk.svg';
import TelegramIcon from '../../assets/social-media-icons/telegram.svg';
import ArrowUp from '../../assets/arrow-up.svg';
import { formatPhoneNumber } from '@/common/commonFunctions';
import Link from 'next/link';

type FooterProps = {
  tels: string[];
  emails: string[];
  socialLinks: Record<string, string>;
};

const Footer = (props: FooterProps) => {
  const { tels, emails, socialLinks } = props;
  return (
    <footer className={s.footer} id='contacts' itemScope itemType='https://schema.org/Organization'>
      <div className={s.footerContent}>
        <div className={s.footerLeft}>
          <p itemProp='name'>ИП Резник Александр Александрович</p>
          <p className={s.inn}>
            ИНН: <span itemProp='taxID'>230808907002</span>
          </p>
          <address
            className={s.address}
            itemProp='address'
            itemScope
            itemType='https://schema.org/PostalAddress'
          >
            <span itemProp='postalCode'>350089</span>,{' '}
            <span itemProp='addressRegion'>Краснодарский край</span>,{' '}
            <span itemProp='addressLocality'>г.&nbsp;Краснодар</span>,{' '}
            <span itemProp='streetAddress'>проспект Чекистов, дом&nbsp;23, оф.&nbsp;226</span>
          </address>
        </div>
        <div className={s.footerCenter}>
          <Logo className={s.logo} />
          <a href='#top' aria-label={'Перейти вверх страницы'} rel='nofollow'>
            <div className={s.arrowUp}>
              <ArrowUp />
            </div>
            НАВЕРХ
          </a>
        </div>
        <div className={s.footerRight}>
          {tels?.map((tel) => {
            return (
              <a href={`tel:${tel}`} className={s.tel} key={tel} itemProp='telephone'>
                {formatPhoneNumber(tel)}
              </a>
            );
          })}
          {emails?.map((email) => {
            return (
              <a href={`mailto:${email}`} className={s.email} key={email}>
                <span itemProp='email'>{email}</span>
              </a>
            );
          })}
          <div className={s.links}>
            {socialLinks?.pinterest && (
              <a
                href={socialLinks.pinterest}
                className={s.link}
                rel='nofollow'
                target={'_blank'}
                aria-label='Мы в Pinterest'
                title='Мы в Pinterest'
                itemProp='sameAs'
              >
                <PinterestIcon />
              </a>
            )}
            {socialLinks?.whatsapp && (
              <a
                href={socialLinks.whatsapp}
                className={s.link}
                rel='nofollow'
                target={'_blank'}
                aria-label='Мы в WhatsApp'
                title='Мы в WhatsApp'
                itemProp='sameAs'
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
                title='Мы на Rutube'
                itemProp='sameAs'
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
                title='Мы на Youtube'
                itemProp='sameAs'
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
                title='Мы ВКонтакте'
                itemProp='sameAs'
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
                aria-label='Мы в Telegram'
                title='Мы в Telegram'
                itemProp='sameAs'
              >
                <TelegramIcon />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={s.footerBottom}>
        <div className={s.bottomLinks}>
          <Link href={'/privacy-policy'} rel='nofollow' target='_blank'>
            Политика конфиденциальности
          </Link>
          <span>
            Разработано в{' '}
            <a href='https://octoweb.ru/' target='_blank' rel='nofollow'>
              OctoWeb
            </a>
          </span>
        </div>
        <p>© {new Date().getFullYear()} «Калейдоскоп игр» — Все права защищены</p>
      </div>
    </footer>
  );
};

export default Footer;
