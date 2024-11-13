import { useScreenWidth } from '@/common/customHooks/useScreenWidth';
import Image from 'next/image';
import { Loader } from '@/components/loader/loader';
import s from '@/components/3d/3d.module.scss';

export const ResponsiveLoader = () => {
  const isMobile = useScreenWidth(767);

  return isMobile ? (
    <div>
      <Image src={'/boy.webp'} alt={'boy'} fill quality={100} />
    </div>
  ) : (
    <div className='fullWidthCentered'>
      <Loader className={s.loader} />
    </div>
  );
};
