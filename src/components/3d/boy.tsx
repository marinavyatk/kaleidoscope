import { ForwardedRef, useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { LoopOnce, Object3D, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { SkeletonUtils } from 'three-stdlib';

export type ModelProps = {
  containerRef: ForwardedRef<HTMLDivElement>;
};

export default function ModelComponent(props: ModelProps) {
  const { containerRef } = props;
  const sceneRef = useRef();
  const { scene, animations } = useGLTF('/models/boy.glb');
  const { actions, names } = useAnimations(animations, sceneRef);

  useEffect(() => {
    const animationName = names[0];
    const action = actions[animationName];
    if (action) {
      action.setLoop(LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
    }
  }, [actions, names]);

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
  const previousTargetPosition = useRef(new Vector3(0, 0, 2));

  useFrame(() => {
    if (head) {
      previousTargetPosition.current.lerp(target.position, 0.1);
      if (head.position.distanceToSquared(previousTargetPosition.current) > 0.01) {
        head.lookAt(previousTargetPosition.current);
      }
    }
  });

  const getContainerElement = () => {
    if (typeof containerRef === 'function') {
      return null;
    }
    return containerRef?.current ?? null;
  };

  useEffect(() => {
    const container = getContainerElement();
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mousePosition.x = (clientX / rect.width) * 2 - 1;
      mousePosition.y = -(clientY / rect.height) * 2 + 1;

      planeNormal.copy(camera.position).normalize();
      plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);

      raycaster.setFromCamera(mousePosition, camera);
      raycaster.ray.intersectPlane(plane, intersectionPoint);

      target.position.set(intersectionPoint.x, intersectionPoint.y, 2);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const clientX = touch.clientX - rect.left;
        const clientY = touch.clientY - rect.top;

        mousePosition.x = (clientX / rect.width) * 2 - 1;
        mousePosition.y = -(clientY / rect.height) * 2 + 1;

        planeNormal.copy(camera.position).normalize();
        plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);

        raycaster.setFromCamera(mousePosition, camera);
        raycaster.ray.intersectPlane(plane, intersectionPoint);

        target.position.set(intersectionPoint.x, intersectionPoint.y, 2);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [
    camera,
    raycaster,
    planeNormal,
    plane,
    scene.position,
    target,
    intersectionPoint,
    containerRef,
  ]);

  return <primitive object={clone} ref={sceneRef} position={[0.14, -1.42, 0]} />;
}
