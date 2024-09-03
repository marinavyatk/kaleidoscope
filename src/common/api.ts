import axios from 'axios';
import {Category, Field, GetFAQ} from '@/common/types';

export const instance = axios.create({
    baseURL: 'http://sashc8qp.beget.tech/wp-json/wp/v2'
});

const getProperties = (array: any[]) => {
    return array.map((item: Record<string, Field>) => {
        const result: Record<string, string> = {};

        for (let key in item) {
            if (item[key] && item[key].rendered) {
                result[key] = item[key].rendered;
            }
        }

        return result;
    });
};

export const api = {
    getFAQ() {
        return instance.get<GetFAQ[]>('/faq?_fields=title,content')
            .then((response) => getProperties(response.data));
    },
    getProducts() {
        return instance.get('/product?_fields=title,content,product_category').then((response) => response.data);
    },
    getProductsCategories() {
        return instance.get<Category[]>('/product_category?_fields=id,name').then((response) => response.data);
    },
    getProjectMap() {
        return instance.get<Category[]>('/project_map').then((response) => response.data);
    },
}