import { useEffect, useState } from 'react';
import { api } from '@/common/api';
import { Category, Nullable } from '@/common/types';

export const useCategories = () => {
  const [categories, setCategories] = useState<Nullable<Category[]>>(null);
  useEffect(() => {
    api
      .getProductsCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return categories;
};
