import { lazy, memo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import s from '../3d.module.scss';
import { Environment } from '@react-three/drei';
import { Loader } from '@/components/loader/loader';
import { ModelProps } from '@/components/3d/boy/boy';

const Model = lazy(() => import('./boy'));

function Scene(props: ModelProps) {
  const { containerRef } = props;
  return (
    <Suspense
      fallback={
        <div className='fullWidthCentered'>
          <Loader className={s.loader} />
        </div>
      }
    >
      <Canvas camera={{ fov: 50, zoom: 7 }} className={s.canvas}>
        <Environment files={'/lebombo_1k.hdr'} environmentIntensity={0.3} />
        <directionalLight position={[2.6, 2.25, 1]} intensity={0.5} />
        <directionalLight position={[-2, -1, -5]} intensity={1.5} />
        <Model containerRef={containerRef} />
      </Canvas>
    </Suspense>
  );
}

export default memo(Scene);
