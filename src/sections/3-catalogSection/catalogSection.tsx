import s from './catalogSection.module.scss';
import { useEffect, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css';
import { Carousel } from '@/components/carousel/carousel';
import Image from 'next/image';
import { useCategories } from '@/common/customHooks/useCategories';
import { v4 as uuid } from 'uuid';
import { Loader } from '@/components/loader/loader';
import { useProducts } from '@/common/customHooks/useProducts';

export const CatalogSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = useCategories();
  const { products, loading } = useProducts(activeCategory);

  useEffect(() => {
    setActiveCategory(categories?.[0].id || 0);
  }, [categories]);

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
