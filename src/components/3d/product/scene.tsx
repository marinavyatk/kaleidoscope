import { lazy, memo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import s from '../3d.module.scss';
import { OrbitControls } from '@react-three/drei';
import { Loader } from '@/components/loader/loader';
import { ModelProps } from '@/components/3d/product/product';
import { clsx } from 'clsx';

const Model = lazy(() => import('./product'));

function Scene(props: ModelProps) {
  const { link } = props;

  return (
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
        <Model link={link} />
      </Canvas>
    </Suspense>
  );
}

export default memo(Scene);
