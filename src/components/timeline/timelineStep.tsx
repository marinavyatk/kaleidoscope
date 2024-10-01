import { clsx } from 'clsx';
import s from './timeline.module.scss';
import { StepData } from '@/common/types';

export type TimelineStepProps = {
  status: 'default' | 'active' | 'viewed';
  setActiveStepIndex: (index: number) => void;
  index: number;
} & StepData;

export const TimelineStep = (props: TimelineStepProps) => {
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
