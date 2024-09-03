import * as SliderRadix from '@radix-ui/react-slider';
import { SliderProps } from '@radix-ui/react-slider';
import s from './slider.module.scss';

export type SliderComponentProps = {
  rootProps?: SliderProps;
};
export const Slider = (props: SliderComponentProps) => {
  const { rootProps } = props;

  return (
    <SliderRadix.Root className={s.sliderRoot} step={1} {...rootProps}>
      <SliderRadix.Track className={s.sliderTrack}>
        <SliderRadix.Range className={s.sliderRange} />
      </SliderRadix.Track>
      <SliderRadix.Thumb className={s.sliderThumb} aria-label='Volume' />
    </SliderRadix.Root>
  );
};
