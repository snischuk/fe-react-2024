import type { Category } from './Category';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: Date | string;
    updatedAt: Date | string;
    category: Category;
}
