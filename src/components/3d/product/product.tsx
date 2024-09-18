import { useMemo, useRef } from 'react';
import { Box, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export type ModelProps = {
  link: string;
};

export default function Model(props: ModelProps) {
  const { link } = props;
  if (!link) return <Box args={[1, 1, 1]} />;

  const sceneRef = useRef();
  // const { scene } = useGLTF('/models/1.glb');
  // const { scene } = useGLTF('https://kaleidoscope-games.store/wp-content/uploads/2024/09/1.glb');
  const { scene } = useGLTF(link, true);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  console.log('link', link);
  return <primitive object={clone} ref={sceneRef} />;
}
