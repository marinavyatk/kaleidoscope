import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import s from './timeline.module.scss';
import { TimelineStep } from '@/components/timeline/timelineStep';

export type StepData = {
  topTitle?: string;
  bottomTitle: string;
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
