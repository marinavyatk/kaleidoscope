import s from './map.module.scss';
import CloseIcon from '../../assets/close.svg';

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
        <div className={s.imgContainer}>
          <img src={placePhoto} alt={placeTitle} />
        </div>
      </div>
      <p>{placeDescription}</p>
    </div>
  );
};
