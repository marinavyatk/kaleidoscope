import { Button } from '@/components/button/button';
import s from './mainSection.module.scss';
import Image from 'next/image';
import { clsx } from 'clsx';

export const MainSection = () => {
  return (
    <section className={s.mainSection}>
      <Image src={'/main-section-bg.webp'} alt='' fill quality={100} className={s.background} />
      <div className={clsx(s.kids, 'fullContainer')} />
      <h1>Калейдоскоп ИГР</h1>
      <p>Производим уникальные изделия для развития спортивного будущего!</p>
      <Button as='a' href='#catalog'>
        Смотреть все изделия
      </Button>
    </section>
  );
};
