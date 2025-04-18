export type Nullable<T> = null | T;

export type Product = {
  name: string;
  description: string;
  shortDescription: string;
  imgId: number;
  imgLoading: boolean;
  img: string;
  specifications: { key: string; value: string }[];
  model: string;
  category: number;
  file: string;
};

export type CategoryProducts = {
  [key: number]: Product[];
};

export type Faq = {
  title: string;
  content: string;
};

export type FormValues = {
  clientName: string;
  clientTel: string;
  clientMessage: string;
};

export type CPFormValues = {
  clientName: string;
  clientTel: string;
  clientEmail: string;
  product: string;
};

export type Album = {
  img: string;
  caption: string;
};

//requests types
export type Category = {
  id: number;
  name: string;
};

export type Field = {
  rendered: string;
};

export type FaqData = {
  title: Field;
  content: Field;
};

export type ProductData = {
  title: Field;
  content: Field;
  short_description: string;
  custom_meta_fields: { key: string; value: string }[];
  link: string;
  ['featured_media']: number;
  ['model_3d_link']: string;
  ['product_category']: number;
  ['render_file']: string;
};

export type DocumentData = {
  title: Field;
  thumbnail_url: string;
};

export type MapData = {
  title: Field;
  content: Field;
  thumbnail_url: string;
  coordinates: string;
};

export type ContactsData = {
  ['consultation_phone']: string;
  ['contact_phones']: string[];
  ['contact_emails']: string[];
  ['social_links']: Record<string, string>;
};

export type PrivacyPolicyData = {
  title: string;
  content: string;
};

export type AlbumData = {
  title: string;
  description: string;
  cover: string;
  images: string[];
};
