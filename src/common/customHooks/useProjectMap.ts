import { Nullable } from '@/common/types';
import { useEffect, useState } from 'react';
import { api } from '@/common/api';
import { StepData } from '@/components/timeline/timeline';

export type ProjectMap = {
  title: string;
  description: string;
  gallery: Array<{ url: string }>;
};

export const useProjectMap = () => {
  const [projectMap, setProjectMap] = useState<Nullable<ProjectMap[]>>(null);
  const [stepData, setStepData] = useState<Nullable<StepData[]>>(null);
  useEffect(() => {
    api
      .getProjectMap()
      .then((data) => {
        const structuredData: ProjectMap[] = [];
        const stepData: StepData[] = [];
        data.forEach((year: any) => {
          if (year.quarter_data.q1) {
            structuredData.push(year.quarter_data.q1);
            stepData.push({ topTitle: year.title.rendered, bottomTitle: '1 квартал' });
          }
          if (year.quarter_data.q2) {
            structuredData.push(year.quarter_data.q2);
            stepData.push({ bottomTitle: '2 квартал' });
          }
          if (year.quarter_data.q3) {
            structuredData.push(year.quarter_data.q3);
            stepData.push({ bottomTitle: '3 квартал' });
          }
          if (year.quarter_data.q4) {
            structuredData.push(year.quarter_data.q4);
            stepData.push({ bottomTitle: '4 квартал' });
          }
        });

        setProjectMap(structuredData);
        setStepData(stepData);
      })
      .catch((error) => console.error('Error fetching project map:', error));
  }, []);

  return { projectMap, stepData };
};
