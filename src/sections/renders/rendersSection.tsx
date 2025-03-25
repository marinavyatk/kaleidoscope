import styles from './renders.module.scss';
import s from '../../sections/catalog/catalogSection.module.scss';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { Category, CategoryProducts, Product } from '@/common/types';
import CloseIcon from '@/assets/close.svg';
import { RenderCarousel } from '@/components/carousel/renderCarousel';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';

type CatalogSectionProps = {
  categories: Category[];
  products: CategoryProducts;
  setOpen: (open: boolean) => void;
};
const RendersSection = (props: CatalogSectionProps) => {
  const { categories, products, setOpen } = props;
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
    <section className={clsx(s.catalogSection, styles.renderSection)}>
      <div className={'fullContainer ' + styles.background}></div>
      <Image src={'/bg-pattern-catalog.svg'} alt='' fill className={s.pattern} />
      <div className={styles.cardHeader}>
        <h2>Для проектировщиков и архитекторов</h2>
        <Dialog.Close className={styles.close} onClick={() => setOpen(false)}>
          <CloseIcon />
        </Dialog.Close>
      </div>
      <div className={s.catalogMain}>
        <RenderCarousel products={currentProducts} />
        <div className={s.categories} ref={categoriesRef}>
          {categoriesButtons}
        </div>
      </div>
    </section>
  );
};

export default RendersSection;
