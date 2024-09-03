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
import { points } from './helpers';
import s from './map.module.scss';
import { ClusterSign } from './clusterSign';
import MapCustomization from './map-customization.json';
import { MapPoint } from './mapPoint';
import * as YMaps from '@yandex/ymaps3-types';
import type { Feature } from '@yandex/ymaps3-types/packages/clusterer/YMapClusterer/interface';
import { useMediaQuery } from 'react-responsive';

export const Map = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const location = { center: [54.81, 54.55], zoom: isMobile ? 2 : 4 };
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
          <YMapCustomClusterer marker={marker} cluster={cluster} gridSize={64} features={points} />
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
