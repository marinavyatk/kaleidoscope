import { useEffect, useState } from 'react';
import { Nullable, Product, ProductData } from '@/common/types';
import { api } from '@/common/api';

export const useProducts = (activeCategory: number) => {
  const [products, setProducts] = useState<Nullable<Product[]>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const getProducts = async () => {
      try {
        const productData = await api.getProducts(activeCategory);
        if (isCancelled) return;

        const structuredData: Product[] = productData.map((product: ProductData) => ({
          description: product.content.rendered,
          name: product.title.rendered,
          specifications: product.custom_meta_fields,
          shortDescription: product.short_description,
          imgId: product['featured_media'],
          imgLoading: true,
          img: '',
          model: product['model_3d_link'],
        }));

        setProducts(structuredData);
        const structuredDataWithImg = await Promise.all(
          structuredData.map(async (product) => {
            const img = await api.getProductImage(product.imgId).finally(() => {
              product = { ...product, imgLoading: false };
            });
            return { ...product, img };
          }),
        );

        if (!isCancelled) {
          setProducts(structuredDataWithImg);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    getProducts();

    return () => {
      isCancelled = true;
    };
  }, [activeCategory]);

  return { products, loading };
};
