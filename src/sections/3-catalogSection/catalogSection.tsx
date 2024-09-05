import s from './catalogSection.module.scss';
import { useEffect, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Carousel } from '@/components/carousel/carousel';
import Image from 'next/image';
import { useCategories } from '@/common/customHooks/useCategories';
import { api } from '@/common/api';
import { Nullable, Product, ProductData } from '@/common/types';
import { v4 as uuid } from 'uuid';
import { Loader } from '@/components/loader/loader';

export const CatalogSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = useCategories();
  const [products, setProducts] = useState<Nullable<Product[]>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveCategory(categories?.[0].id || 0);
  }, [categories]);

  // useEffect(() => {
  //   const structuredData: Product[] = [];
  //   api
  //     .getProducts(activeCategory)
  //     .then((data) => {
  //       data.forEach((product: ProductData) => {
  //         structuredData.push({
  //           description: product.content.rendered,
  //           name: product.title.rendered,
  //           specifications: product.custom_meta_fields,
  //           shortDescription: product.short_description,
  //           img: '',
  //         });
  //       });
  //       return api.getProductImages();
  //     })
  //     .then((img) => {
  //       const updatedProductData = structuredData.map((product) => ({ ...product, img }));
  //       setProducts(updatedProductData);
  //     });
  // }, [activeCategory]);

  useEffect(() => {
    let isCancelled = false; // Флаг для предотвращения обновления состояния после размонтирования компонента
    setLoading(true);
    const fetchProductsAndImages = async () => {
      try {
        const [productData, img] = await Promise.all([
          api.getProducts(activeCategory),
          api.getProductImages(),
        ]);

        if (isCancelled) return; // Проверка, не был ли компонент размонтирован

        const structuredData = productData.map((product: ProductData) => ({
          description: product.content.rendered,
          name: product.title.rendered,
          specifications: product.custom_meta_fields,
          shortDescription: product.short_description,
          img,
        }));

        setProducts(structuredData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false); // Сбрасываем загрузку в false после завершения запроса
      }
    };

    fetchProductsAndImages();

    return () => {
      isCancelled = true; // Устанавливаем флаг, если компонент будет размонтирован
    };
  }, [activeCategory]);

  const categoriesButtons = categories?.map((item) => {
    const handleChangeCategory = () => {
      setActiveCategory(item.id);
    };

    return (
      <button
        className={activeCategory === item.id ? s.active : ''}
        onClick={handleChangeCategory}
        key={uuid()}
      >
        {item.name}
      </button>
    );
  });

  return (
    <section className={s.catalogSection} id='catalog'>
      <div className={s.background}>
        <Image src={'/radial-bg.png'} alt='' fill className={s.gradient} />
        <Image src={'/bg-pattern-catalog.svg'} alt='' fill className={s.pattern} />
      </div>
      <h2>Каталог</h2>
      <div className={s.catalogMain}>
        {loading || !products?.length ? (
          <div className={s.emptyContainer}>
            <Loader />
          </div>
        ) : (
          <Carousel products={products || []} />
        )}
        <div className={s.categories}>{categoriesButtons}</div>
      </div>
    </section>
  );
};
