import {useEffect, useState} from 'react';
import {api} from '@/common/api';
import {CatalogCardData, Field, Nullable, ProductCardData} from '@/common/types';


export type Product = {
    title: Field;
    content: Field;
    meta: Record<string, string>;
    link: string;
};

export const useProducts = () => {
    const [productCardData, setProductCardData] = useState<Nullable<ProductCardData[]>>(null);
    const [catalogCardData, setCatalogCardData] = useState<Nullable<CatalogCardData[]>>(null);

    useEffect(() => {
        const catalogCardDataStructured: CatalogCardData[] = [];
        const productCardDataStructured: ProductCardData[] = [];

        api.getProducts()
            .then((data) => {
                console.log('productAllData:', data);
                data.forEach((product: Product) => {
                    productCardDataStructured.push({
                        description: product.content.rendered,
                        name: product.title.rendered,
                        specifications: product.meta,
                    });

                    catalogCardDataStructured.push({
                        name: product.title.rendered,
                        img: ''
                    });
                });

                return api.getProductImages();
            })
            .then((img) => {
                const updatedCatalogData = catalogCardDataStructured.map((product) => ({...product, img}));
                const updatedProductData = productCardDataStructured.map((product) => ({...product, img}));

                setProductCardData(updatedProductData);
                setCatalogCardData(updatedCatalogData);
            })
            .catch((error) => console.error('Error fetching Products:', error))

    }, []);

    return {productCardData, catalogCardData};
};
