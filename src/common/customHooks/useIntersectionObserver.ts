import { useEffect, useState } from 'react';

export const useIntersectionObserver = (ref: any, threshold: number) => {
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPlayAnimation(true);
          } else {
            setShouldPlayAnimation(false);
          }
        });
      },
      { threshold },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);
  return shouldPlayAnimation;
};
