import { lazy, memo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import s from '../3d.module.scss';
import { OrbitControls } from '@react-three/drei';
import { Loader } from '@/components/loader/loader';
import { ModelProps } from '@/components/3d/product/product';
import { clsx } from 'clsx';
import Image from 'next/image';
import ErrorBoundary from '@/components/errorBoundary/errorBoundary';

const Model = lazy(() => import('./product'));

export type SceneProps = {
  img: string;
  productType: string;
} & ModelProps;

function Scene(props: SceneProps) {
  const { link, img, productType } = props;

  return (
    <ErrorBoundary errorPlaceholder={<Image src={img} alt='Внешний вид МАФ' fill />}>
      <Suspense
        fallback={
          <div className='fullWidthCentered'>
            <Loader />
          </div>
        }
      >
        <Canvas
          className={clsx(s.canvas, s.interactiveCanvas)}
          camera={{ position: [-1.36, 1.73, 2.78], fov: 50 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[-1, 10, -2]} intensity={1.7} />
          <directionalLight position={[2, -5, 5]} intensity={0.5} />
          <OrbitControls
            enableZoom={false}
            minPolarAngle={1}
            maxPolarAngle={1}
            rotateSpeed={0.8}
            enablePan={false}
          />
          <Model link={link} productType={productType} />
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  );
}

export default memo(Scene);
