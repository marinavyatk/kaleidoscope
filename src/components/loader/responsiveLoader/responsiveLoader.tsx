import { useScreenWidth } from '@/common/customHooks/useScreenWidth';
import Image from 'next/image';
import { Loader } from '@/components/loader/loader';
import s from '@/components/3d/3d.module.scss';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export const ResponsiveLoader = () => {
  const isMobile = useScreenWidth(768);
  const [isWidthKnown, setWidthKnown] = useState(false);

  useEffect(() => {
    setWidthKnown(true);
  }, []);

  const className = !isWidthKnown ? s.hidden : '';

  return isMobile ? (
    <div className={className}>
      <Image src={'/boy.webp'} alt={'boy'} fill quality={100} />
    </div>
  ) : (
    <div className={clsx('fullWidthCentered', className)}>
      <Loader className={s.loader} />
    </div>
  );
};
