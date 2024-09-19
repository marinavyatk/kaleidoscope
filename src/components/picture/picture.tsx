import {
  ComponentPropsWithoutRef,
  ElementType,
  forwardRef,
  ReactElement,
  Ref,
  useState,
} from 'react';
import s from './picture.module.scss';
import { Loader, LoaderProps } from '@/components/loader/loader';
import { clsx } from 'clsx';

type PictureProps<T extends ElementType = 'img', CT extends ElementType = 'div'> = {
  component?: T;
  containerComponent?: CT;
  loaderProps?: LoaderProps;
  containerProps?: ComponentPropsWithoutRef<CT>;
} & ComponentPropsWithoutRef<T> & { ref?: Ref<HTMLElement> };

export const Picture = forwardRef(
  <T extends ElementType, CT extends ElementType>(
    props: PictureProps<T, CT>,
    ref: Ref<HTMLElement>,
  ) => {
    const {
      loaderProps,
      component: Component = 'img',
      containerComponent: ContainerComponent = 'div',
      containerProps,
      ...restProps
    } = props;

    const classNames = clsx(s.imgContainer, containerProps?.className);
    const [loading, setLoading] = useState(true);

    const handleImageLoaded = () => {
      setLoading(false);
    };

    return (
      <ContainerComponent {...containerProps} className={classNames}>
        {loading && <Loader {...loaderProps} className={clsx(s.loader, loaderProps?.className)} />}
        <Component ref={ref} onLoad={handleImageLoaded} {...restProps} />
      </ContainerComponent>
    );
  },
) as <T extends ElementType = 'img', CT extends ElementType = 'div'>(
  props: { ref?: Ref<HTMLElement> } & PictureProps<T, CT>,
) => ReactElement;
