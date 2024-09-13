'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Vector3, Plane, Raycaster, Vector2, Object3D, Scene } from 'three';
import { SkeletonUtils } from 'three-stdlib';

export default function ModelComponent() {
  const sceneRef = useRef<Scene>();
  const { scene, animations } = useGLTF('/models/boy.gltf');
  const { actions, names } = useAnimations(animations, sceneRef);

  useEffect(() => {
    names.forEach((animation) => {
      actions?.[animation]?.play();
    });
  }, [names]);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const target = new Object3D();
  target.position.z = 3;
  const mousePosition = new Vector2();
  const raycaster = new Raycaster();
  const intersectionPoint = new Vector3();
  const planeNormal = new Vector3();
  const plane = new Plane();
  const head = useMemo(() => clone.getObjectByName('mixamorigHead'), [clone]);

  const { camera } = useThree();

  useFrame(() => {
    if (head) {
      if (target.position.distanceToSquared(head.position) > 0.01) {
        head.lookAt(target.position);
      }
    }
  });

  window.addEventListener('mousemove', function (e) {
    mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;

    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);

    raycaster.setFromCamera(mousePosition, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    target?.position.set(intersectionPoint.x, intersectionPoint.y, 2);
  });

  return <primitive object={clone} ref={sceneRef} position={[0.14, -1.42, 0]} />;
}
