import axios from 'axios';
import {Category, Field, GetFAQ} from '@/common/types';

export const instance = axios.create({
    // baseURL: 'http://sashc8qp.beget.tech/wp-json/wp/v2'
    // baseURL: 'https://kaleidoscope-games.store',
    baseURL: 'https://kaleidoscope-games.store/wp-json/wp/v2',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
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
    // getFAQ() {
    //     return instance.get<GetFAQ[]>('/faq?_fields=title,content,meta')
    //         .then((response) => getProperties(response.data));
    // },
    getFAQ() {
        return instance.get<GetFAQ[]>('/faq')
            .then((response) => getProperties(response.data));
    },
    // getProducts() {
    //     return instance.get('/product?_fields=title,content,product_category').then((response) => response.data);
    // },
    getProducts() {
        return instance.get('/product').then((response) => response.data);
    },
    getProductImages() {
        return instance.get('/media/18').then((response) => response.data.source_url);
    },
    // getProductsCategories() {
    //     return instance.get<Category[]>('/product_category?_fields=id,name').then((response) => response.data);
    // },
    getProductsCategories() {
        return instance.get<Category[]>('/product_category').then((response) => response.data);
    },
    // getProjectMap() {
    //     return instance.get<any>('/project_map').then((response) => response.data);
    // },
    getProjectMap() {
        return instance.get<any>('/project_map?_fields=quarter_data,title').then((response) => response.data);
    },
}