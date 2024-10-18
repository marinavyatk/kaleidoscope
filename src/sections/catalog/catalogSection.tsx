import s from './catalogSection.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Carousel } from '@/components/carousel/carousel';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { Category, CategoryProducts, Product } from '@/common/types';

type CatalogSectionProps = {
  categories: Category[];
  products: CategoryProducts;
};
const CatalogSection = (props: CatalogSectionProps) => {
  const { categories, products } = props;
  const [activeCategory, setActiveCategory] = useState(categories?.[0]?.id || 0);
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products[activeCategory] || []);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!categoriesRef?.current) return;
    if (categories?.length === 1) {
      categoriesRef.current.style.justifyContent = 'center';
    } else {
      categoriesRef.current.style.justifyContent = 'justify-content: space-between';
    }
  }, [categories]);

  const categoriesButtons = categories?.map((item) => {
    const handleChangeCategory = () => {
      setActiveCategory(item.id);
      setCurrentProducts(products[item.id]);
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
        <Carousel products={currentProducts} />
        <div className={s.categories} ref={categoriesRef}>
          {categoriesButtons}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
