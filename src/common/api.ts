import axios from 'axios';
import { Category, DocumentData, FaqData, Field, FormValues, MapData } from '@/common/types';

export const instance = axios.create({
  baseURL: 'https://kaleidoscope-games.store',
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
  getProductsCategories() {
    return instance
      .get<Category[]>('/wp-json/wp/v2/product_category?_fields=id,name')
      .then((response) => response.data);
  },
  getProducts(categoryId: number) {
    return instance
      .get(
        `/wp-json/wp/v2/product?product_category=${categoryId}&orderby=date&order=asc&fields=title,content,product_category,short_description,custom_meta_fields,featured_media`,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Ошибка при загрузке товаров:', error);
      });
  },
  getProductImage(productId: number) {
    return instance
      .get(`/wp-json/wp/v2/media/${productId}?_fileds=source_url`)
      .then((response) => {
        return response.data.source_url;
      })
      .catch((error) => {
        console.error('Ошибка при загрузке изображений:', error);
      });
  },
  getProjectMap() {
    return instance
      .get<any>('/wp-json/wp/v2/project_map?_fields=quarter_data,title')
      .then((response) => response.data);
  },
  getFAQ() {
    return instance
      .get<FaqData[]>('/wp-json/wp/v2/faq?_fields=title,content')
      .then((response) => getProperties(response.data));
  },
  getDocuments() {
    return instance
      .get<DocumentData[]>('/wp-json/wp/v2/document')
      .then((response) => response.data);
  },
  getDocumentsImages() {
    return instance
      .get('/wp-json/wp/v2/media/28?_fields=source_url')
      .then((response) => response.data);
  },
  getPoints() {
    return instance
      .get<MapData[]>('/wp-json/wp/v2/map_marker?_fields=coordinates,content,title,thumbnail_url')
      .then((response) => response.data);
  },
  sendForm(data: FormValues) {
    const formData = new FormData();
    formData.append('clientName', data.clientName);
    formData.append('clientTel', data.clientTel);
    formData.append('clientMessage', data.clientMessage);
    formData.append('_wpcf7_unit_tag', 'wpcf7-f36-p7-o1');

    return instance.post('/wp-json/contact-form-7/v1/contact-forms/36/feedback', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
