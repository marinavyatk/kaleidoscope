import {useEffect, useState} from 'react';
import {api} from '@/common/api';
import {Category, Nullable} from '@/common/types';

export const useProducts = () => {
    const [products, setProducts] = useState<Nullable<Category[]>>(null);
    useEffect(() => {
        api.getProducts()
            .then((data) => setProducts(data))
            .then((data) => console.log(data))
            .catch((error) => console.error('Error fetching Products:', error));
    }, []);

    return products;
}