import s from './aboutSection.module.scss';
import { Button } from '@/components/button/button';
import Separator from '../../assets/separator.svg';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// const Scene: ComponentType = dynamic(
//   () => import('../../components/3d/scene').then((mod) => mod.Scene),
//   {
//     ssr: false,
//   },
// );
export const AboutSection = () => {
  return (
    <section className={s.aboutSection} id='about'>
      {/*<Scene />*/}
      <Separator className={s.separator} />
      <div className={s.backgroundText}>
        <span>Калейдоскоп</span>
      </div>
      <div className={s.boy}>
        <div className={s.imageContainer}>
          <Image src={'/boy.webp'} alt='' fill quality={100} />
        </div>
      </div>
      <h2>объединяем поколения через соперни&shy;чество</h2>
      <div className={s.description}>
        <div className={s.aboutCompany}>
          <h3>о компании</h3>
          <div className={s.text}>
            <p>
              «Калейдоскоп Игр» разрабатывает и производит уникальные спортивные изделия в виде
              малых архитектурных форм и снарядов для спорта.
            </p>
            <p>
              Мы стремимся превратить каждое своё изделие в источник радости, способный приносить
              пользу как детям, так и взрослым.
            </p>
          </div>
          <Button as='a' href='#form'>
            Заказать звонок
          </Button>
        </div>
        <div className={s.aboutMission}>
          <h3>наша миссия</h3>
          <div className={s.text}>
            <p>
              Миссия «Калейдоскоп Игр» заключается в создании игровых изделий, которые способствуют
              укреплению связей между поколениями через спорт и совместные игры.
            </p>
            <p>
              Мы стремимся, чтобы каждый, кто прикасается к нашим изделиям, чувствовал
              взаимопонимание и радость.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
