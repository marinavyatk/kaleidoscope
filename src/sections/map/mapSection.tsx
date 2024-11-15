import s from './mapSection.module.scss';
import Map from '@/components/map/map';
import { MapData } from '@/common/types';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';
import { useRef } from 'react';

type MapSectionProps = {
  mapData: MapData[];
};

export const MapSection = (props: MapSectionProps) => {
  const { mapData } = props;
  const containerRef = useRef(null);
  const isVisible = useIntersectionObserver(containerRef, 0.02, true);

  return (
    <section className={s.mapSection} id='realized' ref={containerRef}>
      <h2>
        Места
        <br /> размещения
      </h2>
      <div className={s.mapContainer}>{isVisible && <Map mapData={mapData} />}</div>
    </section>
  );
};
