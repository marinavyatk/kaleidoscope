// //variant with always open model
//
// import s from './productCardModal.module.scss';
// import { Modal } from '../modal';
// import { ProductCard } from '@/sections/productCard/productCard';
// import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
// import { Keyboard, Navigation } from 'swiper/modules';
// import { handleSwiper } from '@/common/commonFunctions';
// import { MutableRefObject, useEffect, useRef, useState } from 'react';
// import { Product } from '@/common/types';
// import { clsx } from 'clsx';
//
// export type ProductCardsSliderProps = {
//   products: Product[];
//   activeSlide: number;
//   setActiveIndex: (index: number) => void;
//   openModal: boolean;
//   setOpenModal: (openModal: boolean) => void;
// };
//
// export const ProductCardModal = (props: ProductCardsSliderProps) => {
//   console.log('hello!');
//   const { products, activeSlide, setActiveIndex, openModal, setOpenModal } = props;
//   const swiperRef = useRef<SwiperClass>(null);
//   const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set());
//   const handleSlideChange = (swiper: SwiperClass) => {
//     const currentIndex = swiper.realIndex;
//     if (!viewedSlides.has(currentIndex)) {
//       setViewedSlides((prev) => new Set(prev).add(currentIndex));
//     }
//   };
//
//   const handleOnClose = (index: number) => {
//     if (activeSlide !== index) setActiveIndex(index);
//     setOpenModal(false);
//   };
//
//   useEffect(() => {
//     if (openModal) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [openModal]);
//
//   // useEffect(() => {
//   //   if (!openModal) {
//   //     document.body.removeAttribute('data-scroll-locked');
//   //     document.body.style.pointerEvents = 'unset';
//   //   }
//   // }, [openModal]);
//
//   const cards = products.map((product, index) => {
//     const hasViewed = viewedSlides.has(index);
//     return (
//       <SwiperSlide key={product.name}>
//         <ProductCard
//           productData={product}
//           onClose={() => handleOnClose(index)}
//           swiperRef={swiperRef}
//           hasViewed={hasViewed}
//         />
//       </SwiperSlide>
//     );
//   });
//
//   return (
//     <Modal
//       contentProps={{ className: clsx(s.modalContainer, openModal ? '' : s.modalContainerHidden) }}
//       modalHeader={'Карточка товара'}
//       rootProps={{ defaultOpen: true, open: true, modal: false }}
//       overlayProps={{ className: openModal ? '' : s.hidden }}
//     >
//       <div className={s.productsSlider}>
//         <Swiper
//           modules={[Keyboard, Navigation]}
//           onSwiper={(swiper) => handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>)}
//           onSlideChange={handleSlideChange}
//           keyboard
//           loop
//           initialSlide={openModal ? activeSlide : 1}
//           allowTouchMove={false}
//           autoHeight
//           observer
//           observeParents
//         >
//           {cards}
//         </Swiper>
//       </div>
//     </Modal>
//   );
// };

//variant with regular open model

import s from './productCardModal.module.scss';
import { Modal } from '../modal';
import { ProductCard } from '@/sections/productCard/productCard';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { handleSwiper } from '@/common/commonFunctions';
import { MutableRefObject, useRef, useState } from 'react';
import { Product } from '@/common/types';

export type ProductCardsSliderProps = {
  products: Product[];
  activeSlide: number;
  setActiveIndex: (index: number) => void;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export const ProductCardModal = (props: ProductCardsSliderProps) => {
  const { products, activeSlide, setActiveIndex, openModal, setOpenModal } = props;
  const swiperRef = useRef<SwiperClass>(null);
  const [viewedSlides, setViewedSlides] = useState<Set<number>>(new Set());

  const handleSlideChange = (swiper: SwiperClass) => {
    const currentIndex = swiper.realIndex;
    if (!viewedSlides.has(currentIndex)) {
      setViewedSlides((prev) => new Set(prev).add(currentIndex));
    }
  };

  const handleOnClose = (index: number) => {
    if (activeSlide !== index) setActiveIndex(index);
    setOpenModal(false);
    setViewedSlides(new Set());
  };

  const cards = products.map((product, index) => {
    const hasViewed = viewedSlides.has(index);
    return (
      <SwiperSlide key={product.name}>
        <ProductCard
          productData={product}
          onClose={() => handleOnClose(index)}
          swiperRef={swiperRef}
          hasViewed={hasViewed}
        />
      </SwiperSlide>
    );
  });

  return (
    <Modal
      contentProps={{ className: s.modalContainer }}
      modalHeader={'Карточка товара'}
      rootProps={{ open: openModal }}
    >
      <div className={s.productsSlider}>
        <Swiper
          modules={[Keyboard, Navigation]}
          onSwiper={(swiper) => handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>)}
          onSlideChange={handleSlideChange}
          keyboard
          loop
          initialSlide={openModal ? activeSlide : 1}
          allowTouchMove={false}
          autoHeight
          observer
          observeParents
        >
          {cards}
        </Swiper>
      </div>
    </Modal>
  );
};
