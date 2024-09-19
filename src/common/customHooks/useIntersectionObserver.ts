import { useEffect } from 'react';

export const useIntersectionObserver = (
  ref: any,
  setState: (state: boolean) => void,
  threshold: number,
) => {
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setState(true);
          } else {
            setState(false);
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
};
