import { memo, RefObject, useEffect, useMemo, useRef } from 'react';
import { invalidate, useFrame, useThree } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Object3D, Plane, Raycaster, Vector2, Vector3 } from 'three';
import { cleanUp } from '@/common/commonFunctions';

export type ModelProps = {
  containerRef: RefObject<HTMLDivElement>;
};

function Model(props: ModelProps) {
  const { containerRef } = props;
  const sceneRef = useRef();
  const { scene, animations } = useGLTF('/model/boy.gltf', true);
  const { actions, names } = useAnimations(animations, sceneRef);
  const isVisibleRef = useRef(true);
  const animationFrameId = useRef<number | null>(null);

  function animate() {
    if (!isVisibleRef.current) return;
    invalidate();
    animationFrameId.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    actions[names[0]]?.play();
    actions[names[1]]?.play();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          actions[names[0]]?.play();
          actions[names[1]]?.play();
          animate();
        } else {
          actions[names[0]]?.stop();
          actions[names[1]]?.stop();
          if (animationFrameId.current !== null) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
          }
        }
      },
      { threshold: 0.01 },
    );

    if (containerRef?.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef?.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [containerRef, actions, names]);

  useEffect(() => {
    return cleanUp(scene);
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
    if (!isVisibleRef.current) return;
    if (head) {
      previousTargetPosition.current.lerp(target.position, 0.1);
      head.lookAt(previousTargetPosition.current);
    }
  });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleMove = (clientX: number, clientY: number) => {
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
