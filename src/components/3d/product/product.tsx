import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Mesh, Vector3 } from 'three';

export type ModelProps = {
  link: string;
};

export default function Model(props: ModelProps) {
  const { link } = props;
  const sceneRef = useRef();
  const { scene } = useGLTF(link, true);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((object) => {
          if ((object as Mesh).isMesh) {
            const mesh = object as Mesh;
            mesh.geometry.dispose();
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((material) => material.dispose());
            } else if (mesh.material.isMaterial) {
              mesh.material.dispose();
            }
          }
        });
      }
    };
  }, [scene]);

  useEffect(() => {
    if (sceneRef.current) {
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
