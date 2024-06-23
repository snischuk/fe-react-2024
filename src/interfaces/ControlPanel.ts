import type { ProductFilterByCategory } from './Product';

export enum SortOption {
    PRICE_HIGH_TO_LOW = 'Price (High - Low)',
    PRICE_LOW_TO_HIGH = 'Price (Low - High)',
}

export type SortOptionClickHandler = (sortOption: SortOption) => void;

export type FilterByCategoryHandler = (clickedCategory: ProductFilterByCategory) => void;
