import { MutableRefObject } from 'react';
import { SwiperClass } from 'swiper/react';
import { ProjectMap, StepData } from '@/common/types';

export const handlePrevButtonClick = (swiperRef: MutableRefObject<SwiperClass>) => {
  swiperRef.current?.slidePrev();
};
export const handleNextButtonClick = (swiperRef: MutableRefObject<SwiperClass>) => {
  swiperRef.current?.slideNext();
};
export const handleSwiper = (swiper: SwiperClass, swiperRef: MutableRefObject<SwiperClass>) => {
  swiperRef.current = swiper;
};

export function formatPhoneNumber(phone: string) {
  return `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10)}`;
}

export const getStructuredProjectMap = (data: any[]) => {
  const structuredData: ProjectMap[] = [];
  const stepStructuredData: StepData[] = [];
  data.forEach((year: any) => {
    if (year.quarter_data.q1) {
      structuredData.push(year.quarter_data.q1);
      stepStructuredData.push({ topTitle: year.title.rendered, bottomTitle: '1 квартал' });
    }
    if (year.quarter_data.q2) {
      structuredData.push(year.quarter_data.q2);
      stepStructuredData.push({ bottomTitle: '2 квартал' });
    }
    if (year.quarter_data.q3) {
      structuredData.push(year.quarter_data.q3);
      stepStructuredData.push({ bottomTitle: '3 квартал' });
    }
    if (year.quarter_data.q4) {
      structuredData.push(year.quarter_data.q4);
      stepStructuredData.push({ bottomTitle: '4 квартал' });
    }
  });
  return {
    projectMap: structuredData,
    stepData: stepStructuredData,
  };
};
