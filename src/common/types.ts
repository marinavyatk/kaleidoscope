export type Nullable<T> = null | T

export type ProductCardData = {
    name: string;
    description: string;
    img?: string;
    specifications: Record<string, string>;
};

export type CatalogCardData = {
    name: string;
    description?: string;
    img: string;
};

export type Category = {
    id: string;
    name: string,
}

export type Field = {
    rendered: string
}

export type GetFAQ = {
    title: Field;
    content: Field,
}



