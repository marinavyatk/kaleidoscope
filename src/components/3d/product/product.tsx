import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

export type ModelProps = {
  link: string;
};

export default function Model(props: ModelProps) {
  const { link } = props;
  const sceneRef = useRef();
  const { scene } = useGLTF(link, true);
  const [scale, setScale] = useState(1);
  console.log(link, scale);

  useEffect(() => {
    if (sceneRef.current) {
      const box = new Box3().setFromObject(sceneRef.current);
      const modelSize = box.getSize(new Vector3());
      const maxModelSize = Math.max(modelSize.x, modelSize.y, modelSize.z);
      const screenWidth = window.innerWidth;
      const desiredSize = screenWidth > 650 ? 2.4 : 2;
      const calculatedScale = desiredSize / maxModelSize;
      setScale(calculatedScale);
      console.log(link, modelSize);
    }
  }, [scene]);

  return <primitive object={scene} ref={sceneRef} position={[0, -0.3, 0]} />;
}
