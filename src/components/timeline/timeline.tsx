import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import s from './timeline.module.scss';

export type StepData = {
  topTitle?: string;
  bottomTitle: string;
};

export type TimelineSegmentProps = {
  status: 'default' | 'active' | 'viewed';
  setActiveStepIndex: (index: number) => void;
  index: number;
} & StepData;

export const TimelineStep = (props: TimelineSegmentProps) => {
  const { bottomTitle, index, topTitle, status, setActiveStepIndex } = props;
  const classNames = clsx(s.step, s[status]);
  const handleChangeStep = () => {
    setActiveStepIndex(index);
  };

  return (
    <div className={classNames}>
      {topTitle && <span className={s.topTitle}>{topTitle}</span>}
      <div className={s.graphics}>
        <button
          className={s.pointButton}
          onClick={handleChangeStep}
          aria-label={`Посмотреть ${bottomTitle}`}
        >
          <div className={s.point}></div>
        </button>
        <div className={s.line}>
          <div className={s.filledLine}></div>
        </div>
      </div>
      <span className={s.bottomTitle}>{bottomTitle}</span>
    </div>
  );
};

export type TimelineProps = {
  stepsData?: StepData[];
  activeStepIndex: number;
  setActiveStepIndex: (index: number) => void;
} & ComponentPropsWithoutRef<'div'>;

export const Timeline = (props: TimelineProps) => {
  const { stepsData, activeStepIndex, setActiveStepIndex, className } = props;
  const classNames = clsx(s.timeline, className);
  const getStatus = (index: number) => {
    if (index === activeStepIndex) {
      return 'active';
    } else if (index < activeStepIndex) {
      return 'viewed';
    } else {
      return 'default';
    }
  };

  const steps = stepsData?.map((step, index) => {
    return (
      <SwiperSlide className={s.stepContainer} key={`step-${index}`}>
        <TimelineStep
          index={index}
          {...step}
          status={getStatus(index)}
          setActiveStepIndex={setActiveStepIndex}
        />
      </SwiperSlide>
    );
  });

  return (
    <Swiper slidesPerView={'auto'} className={classNames}>
      {steps}
    </Swiper>
  );
};
