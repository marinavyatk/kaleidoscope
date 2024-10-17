import dynamic from 'next/dynamic';
import { ModelProps } from '@/components/3d/product/product';
import { Loader } from '@/components/loader/loader';
import s from '@/sections/productCard/productCard.module.scss';

const Scene = dynamic<ModelProps>(() => import('./scene'), {
  loading: () => (
    <div className='fullWidthCentered'>
      <Loader className={s.loader} />
    </div>
  ),
});

const SceneWrapper = (props: ModelProps) => {
  const { link } = props;
  return <Scene link={link} />;
};

export default SceneWrapper;
