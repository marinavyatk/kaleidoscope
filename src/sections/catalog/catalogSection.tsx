import s from './catalogSection.module.scss';
import { useState } from 'react';
import { Carousel } from '@/components/carousel/carousel';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { Loader } from '@/components/loader/loader';
import { useProducts } from '@/common/customHooks/useProducts';
import { Category } from '@/common/types';

type CatalogSectionProps = {
  categories: Category[];
};
const CatalogSection = (props: CatalogSectionProps) => {
  const { categories } = props;
  const [activeCategory, setActiveCategory] = useState(categories?.[0].id || 0);
  const { products, loading } = useProducts(activeCategory);

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
      <Image src={'/radial-bg.webp'} alt='' fill className={s.gradient} />
      <Image src={'/bg-pattern-catalog.svg'} alt='' fill className={s.pattern} />
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

export default CatalogSection;
