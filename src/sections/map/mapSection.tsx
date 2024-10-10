import s from './mapSection.module.scss';
import Map from '@/components/map/map';
import { MapData } from '@/common/types';

type MapSectionProps = {
  mapData: MapData[];
};

export const MapSection = (props: MapSectionProps) => {
  const { mapData } = props;
  return (
    <section className={s.mapSection} id='realized'>
      <h2>
        места
        <br /> размещения
      </h2>
      <div className={s.mapContainer}>
        <Map mapData={mapData} />
      </div>
    </section>
  );
};
