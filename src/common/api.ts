import axios from 'axios';
import {
  Category,
  ContactsData,
  CPFormValues,
  DocumentData,
  FaqData,
  Field,
  FormValues,
  MapData,
  PrivacyPolicyData,
} from '@/common/types';

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
      .then((response) => response.data)
      .catch((error) => {
        console.error('Ошибка при загрузке категорий товаров:', error);
      });
  },
  getProducts(categoryId: number) {
    return instance
      .get(
        `/wp-json/wp/v2/product?product_category=${categoryId}&orderby=date&order=asc&fields=title,content,product_category,short_description,custom_meta_fields,featured_media,model_3d_link`,
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
      .then((response) => response.data)
      .catch((error) => {
        console.error('Ошибка при загрузке карты проекта:', error);
      });
  },
  getFAQ() {
    return instance
      .get<FaqData[]>('/wp-json/wp/v2/faq?_fields=title,content')
      .then((response) => getProperties(response.data))
      .catch((error) => {
        console.error('Ошибка при загрузке ЧЗВ:', error);
      });
  },
  getDocuments() {
    return instance
      .get<DocumentData[]>('/wp-json/wp/v2/document?_fields=title, thumbnail_url')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Ошибка при загрузке документов:', error);
      });
  },
  getPoints() {
    return instance
      .get<MapData[]>('/wp-json/wp/v2/map_marker?_fields=coordinates,content,title,thumbnail_url')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Ошибка при загрузке данных карты:', error);
      });
  },
  getContacts() {
    return instance
      .get<ContactsData>('/wp-json/custom/v1/contact-info/')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Ошибка при загрузке контактов:', error);
      });
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
  sendCPForm(data: CPFormValues) {
    const formData = new FormData();
    formData.append('clientName', data.clientName);
    formData.append('clientTel', data.clientTel);
    formData.append('clientEmail', data.clientEmail);
    formData.append('productType', data.product);
    formData.append('_wpcf7_unit_tag', 'wpcf7-f79-p7-o2');

    return instance.post('/wp-json/contact-form-7/v1/contact-forms/79/feedback', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getPrivacyPolicy() {
    return instance
      .get<PrivacyPolicyData>('/wp-json/myplugin/v1/privacy')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Ошибка при загрузке политики конфиденциальности:', error);
      });
  },
};
