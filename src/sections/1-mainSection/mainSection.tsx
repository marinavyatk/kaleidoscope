import { Button } from '@/components/button/button';
import s from './mainSection.module.scss';
import Image from 'next/image';

export const MainSection = () => {
  return (
    <section className={s.mainSection}>
      <Image
        src={'/main-section-bg.webp'}
        alt=''
        fill
        quality={100}
        priority
        className={s.background}
      />
      <Image src={'/kids.webp'} alt='' fill quality={100} priority className={s.kids} />
      <h1>Калейдоскоп ИГР</h1>
      <p>Производим уникальные изделия для развития спортивного будущего!</p>
      <Button as='a' href='#catalog'>
        Смотреть все изделия
      </Button>
    </section>
  );
};
