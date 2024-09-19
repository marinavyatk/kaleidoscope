import { useCallback } from 'react';
import {
  YMap,
  YMapComponentsProvider,
  YMapControls,
  YMapCustomClusterer,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapMarker,
  YMapZoomControl,
} from 'ymap3-components';
import s from './map.module.scss';
import { ClusterSign } from './clusterSign';
import MapCustomization from './map-customization.json';
import { MapPoint } from './mapPoint';
import * as YMaps from '@yandex/ymaps3-types';
import { LngLat } from '@yandex/ymaps3-types';
import type { Feature } from '@yandex/ymaps3-types/packages/clusterer/YMapClusterer/interface';
import { useMap } from '@/common/customHooks/useMap';
import { v4 as uuid } from 'uuid';
import { useScreenWidth } from '@/common/customHooks/useScreenWidth';

export const Map = () => {
  const isTabletOrMobile = useScreenWidth(767);
  const mapData = useMap();
  const pointsInfo: Feature[] | null =
    mapData &&
    mapData.map((point) => ({
      type: 'Feature',
      id: uuid(),
      geometry: {
        type: 'Point',
        coordinates: point.coordinates.split(',').map(Number) as LngLat,
      },
      properties: {
        placeTitle: point.title.rendered,
        placeDescription: point.content.rendered,
        placePhoto: point.thumbnail_url,
      },
    }));

  const location = { center: [54.81, 54.55], zoom: isTabletOrMobile ? 2 : 4 };
  const apiKey = '9e37f796-a14c-440b-8977-8bec80c9f745';

  const marker = useCallback((feature: any) => {
    return <MapPoint coordinates={feature.geometry.coordinates} {...feature.properties} />;
  }, []);

  const cluster = useCallback(
    (coordinates: YMaps.LngLat, features: Feature[]) => (
      <YMapMarker coordinates={coordinates}>
        <ClusterSign number={features.length} />
      </YMapMarker>
    ),
    [],
  );

  return (
    <div className={s.map}>
      <YMapComponentsProvider apiKey={apiKey} lang='ru_RU'>
        <YMap
          key='map'
          location={location}
          mode='vector'
          behaviors={['drag', 'pinchZoom', 'dblClick']}
          zoomRange={{ min: 2, max: 21 }}
        >
          <YMapCustomClusterer
            marker={marker}
            cluster={cluster}
            gridSize={64}
            features={pointsInfo || []}
          />
          <YMapDefaultSchemeLayer
            customization={MapCustomization as YMaps.VectorCustomizationItem[]}
          />
          <YMapDefaultFeaturesLayer />
          <YMapControls position='bottom'>
            <YMapZoomControl />
          </YMapControls>
        </YMap>
      </YMapComponentsProvider>
    </div>
  );
};
