import * as YMaps from '@yandex/ymaps3-types';
import { useState } from 'react';
import { YMapMarker } from 'ymap3-components';
import s from './map.module.scss';
import { MapCard, MapCardProps } from './mapCard';
import PlaceMarker from '../../assets/map-marker.svg';

export type MapPointProps = { coordinates: YMaps.LngLat } & Omit<MapCardProps, 'onClose'>;

export const MapPoint = (props: MapPointProps) => {
  const { coordinates, ...cardProps } = props;

  const [isInfoShown, setIsInfoShown] = useState(false);
  return (
    <>
      <YMapMarker coordinates={coordinates}>
        <PlaceMarker className={s.placeMarker} onClick={() => setIsInfoShown(true)} />
      </YMapMarker>

      {isInfoShown && (
        <YMapMarker coordinates={coordinates}>
          <MapCard {...cardProps} onClose={setIsInfoShown} />
        </YMapMarker>
      )}
    </>
  );
};
