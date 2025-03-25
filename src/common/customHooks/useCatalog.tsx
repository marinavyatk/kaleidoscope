import { useEffect, useRef, useState } from 'react';
import { Category, CategoryProducts, Product } from '@/common/types';
import s from '@/sections/catalog/catalogSection.module.scss';
import { v4 as uuid } from 'uuid';

export const useCatalog = (categories: Category[], products: CategoryProducts) => {
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

  return {
    currentProducts,
    categoriesButtons,
    categoriesRef,
  };
};
