import s from './productCardModal.module.scss';
import { Modal } from '../modal';
import { ProductCard } from '@/sections/productCard/productCard';
import { Button } from '../../button/button';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { handleSwiper } from '@/common/commonFunctions';
import { MutableRefObject, useRef } from 'react';
import { Product } from '@/common/types';

export type ProductCardsSliderProps = {
  products: Product[];
  activeSlide: number;
  setActiveIndex: (index: number) => void;
};
export const ProductCardModal = (props: ProductCardsSliderProps) => {
  const { products, activeSlide, setActiveIndex } = props;
  const swiperRef = useRef<SwiperClass>(null);

  const cards = products.map((product, index) => {
    return (
      <SwiperSlide key={product.name}>
        <ProductCard
          productData={product}
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
            handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>);
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
