import { useEffect, useRef, useState } from 'react';
import s from './debAnimation.module.scss';

export const DebAnimation = ({ images }: { images: HTMLImageElement[] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (images.length === 0) return;

    intervalRef.current = setInterval(() => {
      setFrameIndex((prevIndex) => {
        if (prevIndex === images.length - 1) {
          clearInterval(intervalRef.current!);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 83);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images]);

  const drawImageCover = (context: CanvasRenderingContext2D, img: HTMLImageElement) => {
    const canvas = context.canvas;
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

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    const render = () => {
      drawImageCover(context, images[frameIndex]);
    };

    render();

    const handleResize = () => {
      const canvas = canvasRef.current!;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      render();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [frameIndex, images]);

  return <>{images.length > 0 && <canvas ref={canvasRef} className={s.canvas} />}</>;
};
