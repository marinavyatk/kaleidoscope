import s from './mapSection.module.scss';
import { Map } from '@/components/map/map';

export const MapSection = () => {
  return (
    <section className={s.mapSection} id='realized'>
      <h2>
        места
        <br /> размещения
      </h2>
      <div className={s.mapContainer}>
        <Map />
      </div>
    </section>
  );
};
