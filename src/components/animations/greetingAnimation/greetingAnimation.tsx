import React, { useRef, useEffect, useState } from 'react';

function getCurrentFrame(index: number): string {
  return `/greeting/idle_${index.toString().padStart(5, '0')}.png`;
}

export const ImageCanvas = ({ numFrames }: { numFrames: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);

  function preloadImages(): Promise<HTMLImageElement[]> {
    return new Promise((resolve, reject) => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 1; i <= numFrames; i++) {
        const img = new Image();
        const imgSrc = getCurrentFrame(i);
        img.src = imgSrc;

        img.onload = () => {
          loadedCount++;
          loadedImages[i - 1] = img;
          if (loadedCount === numFrames) {
            resolve(loadedImages);
          }
        };

        img.onerror = (err) => {
          console.error(`Failed to load image: ${imgSrc}`, err);
          reject(err);
        };
      }
    });
  }

  useEffect(() => {
    const loadImagesAndSetup = async () => {
      const loadedImages = await preloadImages();
      setImages(loadedImages);

      const interval = setInterval(() => {
        setFrameIndex((prevIndex) => (prevIndex + 1) % numFrames);
      }, 60);

      return () => clearInterval(interval);
    };

    loadImagesAndSetup();
  }, []);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) {
      return;
    }

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    const render = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear the canvas before drawing
      context.drawImage(images[frameIndex], 0, 0);
    };

    render();
  }, [frameIndex, images]);

  return <div>{images.length > 0 && <canvas ref={canvasRef} width={800} height={900} />}</div>;
};
