import s from './productCardModal.module.scss';
import { Modal } from '../modal';
import { ProductCard } from '@/sections/productCard/productCard';
import { Button } from '../../button/button';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { handleSwiper } from '@/common/commonFunctions';
import {MutableRefObject, useRef} from 'react';
import {ProductCardData} from '@/common/types';

export type ProductCardsSliderProps = {
  productsData: ProductCardData[];
  activeSlide: number;
  setActiveIndex: (index: number) => void;
};
export const ProductCardModal = (props: ProductCardsSliderProps) => {
  const { productsData, activeSlide, setActiveIndex } = props;

  const swiperRef = useRef<SwiperClass>(null);

  const cards = productsData.map((product, index) => {
    return (
      <SwiperSlide key={product.name}>
        <ProductCard
          productData={{ ...product }}
          onClose={() => setActiveIndex(index)}
          swiperRef={swiperRef}
        />
      </SwiperSlide>
    );
  });

  return (
    <Modal
      contentProps={{ className: s.modalContainer }}
      modalHeader={'Product card'}
      trigger={<Button>Смотреть</Button>}
    >
      <div className={s.productsSlider}>
        <Swiper
          modules={[Keyboard, Navigation]}
          onSwiper={(swiper) => {
            handleSwiper(swiper, swiperRef as  MutableRefObject<SwiperClass>);
          }}
          keyboard
          loop
          initialSlide={activeSlide}
        >
          {cards}
        </Swiper>
      </div>
    </Modal>
  );
};
