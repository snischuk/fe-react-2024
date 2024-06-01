export enum SortOption {
    PRICE_HIGH_LOW = 'Price (High - Low)',
    PRICE_LOW_HIGH = 'Price (Low - High)',
    NEWEST = 'Newest',
    OLDEST = 'Oldest',
}

export type SortOptionChangeHandler = (sortOption: SortOption) => void;

export interface SortOptionProps {
    selectedSortOption: SortOption;
    onSortOptionChange: SortOptionChangeHandler;
}
