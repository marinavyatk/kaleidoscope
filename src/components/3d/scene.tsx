'use client';

import { lazy, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import s from './3d.module.scss';
import { Environment } from '@react-three/drei';
import { Loader } from '@/components/loader/loader';

const ModelComponent = lazy(() => import('./boy'));

export function Scene() {
  return (
    <Suspense
      fallback={
        <div className={s.loader}>
          <Loader />
        </div>
      }
    >
      <Canvas camera={{ fov: 50, zoom: 7 }} className={s.canvas}>
        <Environment preset={'apartment'} environmentIntensity={0.3} />
        <directionalLight position={[2.6, 2.25, 1]} intensity={0.5} />
        <directionalLight position={[-2, -1, -5]} intensity={1.5} />
        <ModelComponent />
      </Canvas>
    </Suspense>
  );
}
