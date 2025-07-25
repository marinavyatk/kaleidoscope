import axios from 'axios';
import {
  AlbumData,
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
  baseURL: 'https://kaleidoscope-games.ru',
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
        `/wp-json/wp/v2/product?product_category=${categoryId}&orderby=date&order=asc&fields=title,content,product_category,short_description,custom_meta_fields,featured_media,model_3d_link,render_file`,
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
  getAlbums() {
    return instance
      .get<AlbumData[]>('/wp-json/custom/v1/albums/')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Ошибка при загрузке контактов:', error);
      });
  },
  async sendForm(data: FormValues) {
    const formData = new FormData();
    formData.append('clientName', data.clientName);
    formData.append('clientTel', data.clientTel);
    formData.append('clientMessage', data.clientMessage);

    let validationToken = '';
    if (typeof window !== 'undefined') {
      const { getRecaptchaToken } = await import('@/common/captcha');
      validationToken = await getRecaptchaToken();
    }
    formData.append('g-recaptcha-response', validationToken || '');

    return instance.post('/wp-json/custom-forms/v1/contact', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async sendCPForm(data: CPFormValues) {
    const formData = new FormData();
    formData.append('clientName', data.clientName);
    formData.append('clientTel', data.clientTel);
    formData.append('clientEmail', data.clientEmail);
    formData.append('productType', data.product);

    let validationToken = '';
    if (typeof window !== 'undefined') {
      const { getRecaptchaToken } = await import('@/common/captcha');
      validationToken = await getRecaptchaToken();
    }
    formData.append('g-recaptcha-response', validationToken || '');

    return instance.post('/wp-json/custom-forms/v1/product-request', formData, {
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
