import { useEffect, useState } from 'react';
import { api } from '@/common/api';
import { MapData, Nullable } from '@/common/types';

export const useMap = () => {
  const [map, setMap] = useState<Nullable<MapData[]>>(null);

  useEffect(() => {
    api
      .getPoints()
      .then((data) => {
        if (data) setMap(data);
      })
      .catch((error) => console.error('Error fetching map:', error));
  }, []);

  return map;
};
