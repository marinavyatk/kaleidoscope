import s from './map.module.scss';
import CloseIcon from '../../assets/close.svg';
import Image from 'next/image';
import { Picture } from '@/components/picture/picture';

export type MapCardProps = {
  placeTitle: string;
  placePhoto: string;
  placeDescription: string;
  onClose: (isOpen: boolean) => void;
};

export const MapCard = (props: MapCardProps) => {
  const { placeTitle, placePhoto, placeDescription, onClose } = props;
  return (
    <div className={s.placeCard}>
      <div>
        <div className={s.header}>
          <h6>{placeTitle}</h6>
          <button className={s.btnClose} onClick={() => onClose(false)}>
            <CloseIcon />
          </button>
        </div>
        {placePhoto && (
          <Picture
            component={Image}
            src={placePhoto}
            alt={placeDescription}
            fill
            sizes='(max-width: 767px) 238px, (max-width: 1439px) 368px, 468px'
            loaderProps={{ lightBackground: true }}
            containerProps={{ className: s.imgContainer }}
          />
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: placeDescription }} className={s.description}></div>
    </div>
  );
};
