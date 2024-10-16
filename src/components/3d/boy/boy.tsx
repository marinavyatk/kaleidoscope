import { memo, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { invalidate, useFrame, useThree } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Mesh, Object3D, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';

export type ModelProps = {
  containerRef: RefObject<HTMLDivElement>;
};

function Model(props: ModelProps) {
  const { containerRef } = props;
  const sceneRef = useRef();
  const { scene, animations } = useGLTF('/boy.glb', true);
  const { actions, names } = useAnimations(animations, sceneRef);
  const isVisible = useIntersectionObserver(containerRef, 0.02);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isVisible) {
      intervalId = setInterval(() => {
        invalidate();
      }, 17);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isVisible]);

  useEffect(() => {
    const bodyAnimation = actions[names[0]];
    const blinkAnimation = actions[names[1]];
    blinkAnimation?.play();
    bodyAnimation?.play();

    return () => {
      blinkAnimation?.stop();
      bodyAnimation?.stop();
    };
  }, []);

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

  const target = useMemo(() => {
    const newTarget = new Object3D();
    newTarget.position.z = 3;
    return newTarget;
  }, []);
  const mousePosition = useMemo(() => new Vector2(), []);
  const raycaster = useMemo(() => new Raycaster(), []);
  const planeNormal = useMemo(() => new Vector3(), []);
  const plane = useMemo(() => new Plane(), []);
  const intersectionPoint = useMemo(() => new Vector3(), []);
  const head = useMemo(() => scene.getObjectByName('mixamorigHead'), [scene]);
  const { camera } = useThree();
  const previousTargetPosition = useRef(new Vector3(0, 0, 2));

  useFrame(() => {
    if (head) {
      previousTargetPosition.current.lerp(target.position, 0.1);
      head.lookAt(previousTargetPosition.current);
    }
  });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMove = (clientX: number, clientY: number) => {
      invalidate();
      const rect = container.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      mousePosition.x = (relativeX / rect.width) * 2 - 1;
      mousePosition.y = -(relativeY / rect.height) * 2 + 1;

      planeNormal.copy(camera.position).normalize();
      plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
      raycaster.setFromCamera(mousePosition, camera);
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      target.position.set(intersectionPoint.x, intersectionPoint.y, 2);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('touchmove', handleTouchMove);
    };
  }, [target, containerRef]);

  return <primitive object={scene} ref={sceneRef} position={[0.14, -1.42, 0]} />;
}

export default memo(Model);
