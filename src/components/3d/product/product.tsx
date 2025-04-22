import { memo, useEffect, useRef, useState } from 'react';
import { Box3, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { cleanUp } from '@/common/commonFunctions';

export type ModelProps = {
  link: string;
  productType: string;
};

function Model(props: ModelProps) {
  const { link, productType } = props;
  const sceneRef = useRef(null);
  const { scene } = useGLTF(link, true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!productType.toLowerCase().includes('коробка')) {
      return;
    }
    if (scene && sceneRef.current) {
      const box = new Box3().setFromObject(sceneRef.current);
      const modelSize = box.getSize(new Vector3());
      let maxModelSize = Math.max(modelSize.x, modelSize.y, modelSize.z);
      const minModelSize = Math.min(modelSize.x, modelSize.z);
      if (maxModelSize / minModelSize > 3) {
        maxModelSize = 2.5;
      }
      const screenWidth = window.innerWidth;
      const desiredSize = screenWidth > 650 ? 2.7 : 2;
      const calculatedScale = desiredSize / maxModelSize;
      setScale(calculatedScale);
    }

    return cleanUp(scene);
  }, [scene]);

  return (
    <primitive
      object={scene}
      ref={sceneRef}
      position={[0, -0.3, 0]}
      scale={[scale, scale, scale]}
    />
  );
}

export default memo(Model);
