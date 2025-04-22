import { useState } from 'react';
import { Category, CategoryProducts, Product } from '@/common/types';
import s from '@/sections/catalog/catalogSection.module.scss';
import { v4 as uuid } from 'uuid';

export const useCatalog = (categories: Category[], products: CategoryProducts) => {
  const [activeCategory, setActiveCategory] = useState(categories?.[0]?.id || 0);
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products[activeCategory] || []);

  const filteredCategories = categories?.filter((category) => {
    return (
      products[category.id].length > 0 && products[category.id].every((product) => product.file)
    );
  });
  const categoriesButtons = filteredCategories?.map((item) => {
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
    activeCategory,
  };
};
