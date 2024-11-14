import s from './aboutSection.module.scss';
import { Button } from '@/components/button/button';
import Separator from '../../assets/separator.svg';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ModelProps } from '@/components/3d/boy/boy';
import { Loader } from '@/components/loader/loader';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';
import { Nullable } from '@/common/types';
import { BoyAnimation } from '@/components/animations/boyAnimation/boyAnimation';
import { useScreenWidth } from '@/common/customHooks/useScreenWidth';

const Scene = dynamic<ModelProps>(() => import('../../components/3d/boy/scene'), {
  loading: () => (
    <div className={'fullWidthCentered'}>
      <Loader className={s.loader} />
    </div>
  ),
});

const AboutSection = () => {
  const modelContainerRef = useRef<Nullable<HTMLDivElement>>(null);
  const isVisible = useIntersectionObserver(modelContainerRef, 0.4, true);
  const isTabletOrMobile = useScreenWidth(768);
  const boy = isTabletOrMobile ? (
    <BoyAnimation containerRef={modelContainerRef} />
  ) : (
    <Scene containerRef={modelContainerRef} />
  );
  return (
    <section className={s.aboutSection} id='about' ref={modelContainerRef}>
      <Separator className={s.separator} />
      <div className={'fullContainer ' + s.backgroundText}>
        <span>Калейдоскоп</span>
      </div>
      <div className={'fullContainer ' + s.boy}>
        <div className={s.imageContainer}>
          {isVisible ? (
            boy
          ) : (
            <div className={'fullWidthCentered'}>
              <Loader className={s.loader} />
            </div>
          )}
        </div>
      </div>
      <h2>Объединяем поколения через соперни&shy;чество</h2>
      <div className={s.description}>
        <div className={s.aboutCompany}>
          <h3>О компании</h3>
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
          <h3>Наша миссия</h3>
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

export default AboutSection;
