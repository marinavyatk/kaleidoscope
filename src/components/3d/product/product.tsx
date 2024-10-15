// import { useEffect, useRef, useState } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { Box3, Vector3 } from 'three';
//
// export type ModelProps = {
//   link: string;
// };
//
// export default function Model(props: ModelProps) {
//   const { link } = props;
//   const sceneRef = useRef();
//   const { scene } = useGLTF(link, true);
//   const [scale, setScale] = useState(1);
//
//   useEffect(() => {
//     if (sceneRef.current) {
//       const box = new Box3().setFromObject(sceneRef.current);
//       const modelSize = box.getSize(new Vector3());
//       let maxModelSize = Math.max(modelSize.x, modelSize.y, modelSize.z);
//       const minModelSize = Math.min(modelSize.x, modelSize.z);
//       if (maxModelSize / minModelSize > 3) {
//         maxModelSize = 2.5;
//       }
//       const screenWidth = window.innerWidth;
//       const desiredSize = screenWidth > 650 ? 2.7 : 2;
//       const calculatedScale = desiredSize / maxModelSize;
//       setScale(calculatedScale);
//     }
//   }, [scene]);
//
//   return (
//     <primitive
//       object={scene}
//       ref={sceneRef}
//       position={[0, -0.3, 0]}
//       scale={[scale, scale, scale]}
//     />
//   );
// }

import { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Group, Object3DEventMap, Vector3 } from 'three';
import { Nullable } from '@/common/types';

export type ModelProps = {
  link: string;
};

export default function Model(props: ModelProps) {
  const { link } = props;
  const sceneRef = useRef(null);
  const modelRef = useRef<Nullable<Group<Object3DEventMap>>>(null);
  const [scale, setScale] = useState(1);

  const { scene } = useGLTF(link, true);

  useEffect(() => {
    if (!modelRef.current && scene) {
      modelRef.current = scene;
    }

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
      object={modelRef.current || scene}
      ref={sceneRef}
      position={[0, -0.3, 0]}
      scale={[scale, scale, scale]}
    />
  );
}
