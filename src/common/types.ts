export type Field = {
    rendered: string
}

export type GetFAQ = {
    title: Field;
    content: Field,

}

export type Category = {
    id: string;
    name: string,
}

export type Nullable<T> = null | T