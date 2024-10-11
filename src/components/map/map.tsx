import { memo, useCallback, useEffect, useState } from 'react';
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
import { v4 as uuid } from 'uuid';
import { useScreenWidth } from '@/common/customHooks/useScreenWidth';
import { MapData, Nullable } from '@/common/types';

type MapProps = {
  mapData: MapData[];
};

const Map = (props: MapProps) => {
  const { mapData } = props;
  const isTabletOrMobile = useScreenWidth(767);
  const [center, setCenter] = useState<LngLat>([54.81, 54.55]);
  const [zoom, setZoom] = useState<number>(4.2);
  useEffect(() => {
    if (isTabletOrMobile) setZoom(2);
  }, [isTabletOrMobile]);

  const pointsInfo: Nullable<Feature[]> =
    mapData &&
    mapData
      .filter((point) => point.coordinates)
      .map((point) => ({
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

  const apiKey = '9e37f796-a14c-440b-8977-8bec80c9f745';

  const calculateClusterBounds = (features: Feature[]) => {
    let minP = [999, 999];
    let maxP = [0, 0];
    for (const feature of features) {
      const [lng, lat] = feature.geometry.coordinates;
      minP[0] = Math.min(minP[0], lng);
      minP[1] = Math.min(minP[1], lat);
      maxP[0] = Math.max(maxP[0], lng);
      maxP[1] = Math.max(maxP[1], lat);
    }
    return [minP, maxP];
  };

  const onClusterClickHandler = useCallback((coordinates: LngLat, features: Feature[]) => {
    const bounds = calculateClusterBounds(features);
    const newCenter: LngLat = [
      (bounds[0][0] + bounds[1][0]) / 2,
      (bounds[0][1] + bounds[1][1]) / 2,
    ];
    const latDiff = bounds[1][1] - bounds[0][1];
    const lngDiff = bounds[1][0] - bounds[0][0];
    const newZoom = Math.max(2, Math.min(15, Math.log2(360 / Math.max(latDiff, lngDiff))));

    setCenter(newCenter);
    setZoom(newZoom);
  }, []);

  const marker = useCallback((feature: any) => {
    return <MapPoint coordinates={feature.geometry.coordinates} {...feature.properties} />;
  }, []);

  const cluster = useCallback(
    (coordinates: YMaps.LngLat, features: Feature[]) => (
      <YMapMarker
        coordinates={coordinates}
        onClick={() => onClusterClickHandler(coordinates, features)}
      >
        <ClusterSign number={features.length} />
      </YMapMarker>
    ),
    [onClusterClickHandler],
  );

  return (
    <div className={s.map}>
      <YMapComponentsProvider apiKey={apiKey} lang='ru_RU'>
        <YMap
          key='map'
          location={{ center, zoom }}
          mode='vector'
          behaviors={['drag', 'pinchZoom', 'dblClick']}
          zoomRange={{ min: 2, max: 21 }}
        >
          <YMapCustomClusterer
            marker={marker}
            cluster={cluster}
            gridSize={128}
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

export default memo(Map);
