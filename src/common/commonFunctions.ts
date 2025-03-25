import { MutableRefObject } from 'react';
import { SwiperClass } from 'swiper/react';
import { Product, ProductData } from '@/common/types';
import { api } from '@/common/api';
import { Group, Mesh } from 'three';

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

export const getStructuredProducts = (activeCategory: number) => {
  const getProducts = async () => {
    try {
      const productData = await api.getProducts(activeCategory);
      const structuredData: Product[] = productData.map((product: ProductData) => ({
        description: product.content.rendered,
        name: product.title.rendered,
        specifications: product.custom_meta_fields,
        shortDescription: product.short_description,
        imgId: product['featured_media'],
        imgLoading: true,
        img: '',
        model: product['model_3d_link'],
        category: product['product_category'],
        file: product['render_file'],
      }));

      const structuredDataWithImg = await Promise.all(
        structuredData.map(async (product) => {
          const img = await api.getProductImage(product.imgId).finally(() => {
            product = { ...product, imgLoading: false };
          });
          return { ...product, img };
        }),
      );
      return structuredDataWithImg;
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  return getProducts();
};

export const cleanUp = (scene: Group) => {
  if (scene) {
    scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        const mesh = object as Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else if (mesh.material.isMaterial) {
          mesh.material.dispose();
        }
      }
    });
  }
};
