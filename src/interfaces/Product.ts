export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: Date | string;
    updatedAt: Date | string;
    category: ProductCategory;
}

export interface ProductCategory {
    id: number;
    name: string;
    image: string;
    creationAt: Date | string;
    updatedAt: Date | string;
}

export type ProductFilterByCategory = Pick<ProductCategory, 'id' | 'name'>;

export type AddProductToCartHandler = (product: Product) => void;
