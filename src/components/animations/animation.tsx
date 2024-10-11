import { useEffect, useRef, useState, useCallback } from 'react';
import s from './animation.module.scss';
import { Nullable } from '@/common/types';

type AnimationProps = {
  images: HTMLImageElement[];
  setAnimationEnd?: (animationEnd: boolean) => void;
  ms: number;
  loop?: boolean;
  repeatInterval?: number;
};

type ImageDimensions = {
  renderWidth: number;
  renderHeight: number;
  offsetX: number;
  offsetY: number;
};

export const Animation = ({
  images,
  ms,
  loop = false,
  repeatInterval = 0,
  setAnimationEnd,
}: AnimationProps) => {
  const canvasRef = useRef<Nullable<HTMLCanvasElement>>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<Nullable<ImageDimensions>>(null);

  const calculateImageDimensions = useCallback(
    (canvas: HTMLCanvasElement, img: HTMLImageElement): ImageDimensions => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const canvasAspect = canvasWidth / canvasHeight;
      const imageAspect = imgWidth / imgHeight;

      let renderWidth, renderHeight, offsetX, offsetY;

      if (imageAspect > canvasAspect) {
        renderHeight = canvasHeight;
        renderWidth = imgWidth * (canvasHeight / imgHeight);
        offsetX = (canvasWidth - renderWidth) / 2;
        offsetY = 0;
      } else {
        renderWidth = canvasWidth;
        renderHeight = imgHeight * (canvasWidth / imgWidth);
        offsetX = 0;
        offsetY = (canvasHeight - renderHeight) / 2;
      }

      return { renderWidth, renderHeight, offsetX, offsetY };
    },
    [],
  );

  const drawImage = useCallback(
    (context: CanvasRenderingContext2D, img: HTMLImageElement, dimensions: ImageDimensions) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.drawImage(
        img,
        dimensions.offsetX,
        dimensions.offsetY,
        dimensions.renderWidth,
        dimensions.renderHeight,
      );
    },
    [],
  );

  const updateFrame = useCallback(() => {
    if (!canvasRef.current || images.length === 0 || !imageDimensions) return;
    const context = canvasRef.current.getContext('2d');
    if (context) {
      drawImage(context, images[frameIndex], imageDimensions);
    }
  }, [frameIndex, images, imageDimensions, drawImage]);

  useEffect(() => {
    if (images.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => {
        const isLastFrame = prevIndex === images.length - 1;
        if (isLastFrame) {
          if (loop) {
            setIsPaused(true);
            return 0;
          } else {
            return prevIndex;
          }
        }
        return prevIndex + 1;
      });
    }, ms);

    return () => clearInterval(interval);
  }, [images, ms, loop, isPaused]);

  useEffect(() => {
    if (isPaused && loop) {
      const timeout = setTimeout(() => setIsPaused(false), repeatInterval);
      return () => clearTimeout(timeout);
    }
  }, [isPaused, loop, repeatInterval]);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || images.length === 0) return;
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setImageDimensions(calculateImageDimensions(canvas, images[0]));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [images, calculateImageDimensions]);

  useEffect(() => {
    updateFrame();
  }, [frameIndex, updateFrame]);

  useEffect(() => {
    if (frameIndex === images.length - 1 && !loop) {
      setAnimationEnd?.(true);
    }
  }, [frameIndex, images.length, loop, setAnimationEnd]);

  return <canvas ref={canvasRef} className={'fullContainer mainContainer ' + s.canvas} />;
};
