export type Nullable<T> = null | T;

export type Product = {
  name: string;
  description: string;
  shortDescription: string;
  img?: string;
  specifications: { key: string; value: string }[];
};

export type Faq = {
  title: string;
  content: string;
};

export type FormValues = {
  name: string;
  tel: string;
  message: string;
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
