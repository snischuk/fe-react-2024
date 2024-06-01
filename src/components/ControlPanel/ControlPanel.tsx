import type { RefObject } from 'react';
import { type FC } from 'react';

import { SelectCustom } from '@components/ui/SelectCustom/SelectCustom';
import IconSearch from '@icons/search.svg?react';
import type { FilterByCategory, SortOptionProps } from '@interfaces/ControlPanel';
import type { Product, ProductCategoryName } from '@interfaces/Product';

import { getUniqueProductCategoryNames } from '@/utils/product.service';

import styles from './ControlPanel.module.css';

interface ControlPanelProps extends SortOptionProps, FilterByCategory {
    products: Product[];
    searchInputRef: RefObject<HTMLInputElement>;
    onSearchBtnClick: () => void;
}

const ControlPanel: FC<ControlPanelProps> = ({
    selectedSortOption,
    onSortOptionChange,
    products,
    selectedFiltersByCategory,
    onFilterByCategoryClick,
    onSearchBtnClick,
    searchInputRef,
}) => {
    const uniqueProductCategoriesNames = getUniqueProductCategoryNames(products);

    const getFilterButtonClassName = (filterButtonName: ProductCategoryName) =>
        selectedFiltersByCategory.includes(filterButtonName) ? `${styles.filterBtn} ${styles.filterBtnActive}` : styles.filterBtn;

    return (
        <fieldset className={styles.controlPanel}>
            <fieldset className={styles.searchBar}>
                <input className={styles.searchInput} type="search" placeholder="Search..." ref={searchInputRef} />
                <button className={styles.searchBtn} onClick={onSearchBtnClick}>
                    <IconSearch className={styles.searchIcon} />
                </button>
            </fieldset>

            <fieldset className={styles.filterBar}>
                {uniqueProductCategoriesNames.map((categoryName: ProductCategoryName) => (
                    <button
                        className={getFilterButtonClassName(categoryName)}
                        key={categoryName}
                        onClick={() => onFilterByCategoryClick(categoryName)}
                    >
                        {categoryName}
                    </button>
                ))}
            </fieldset>

            <SelectCustom selectedSortOption={selectedSortOption} onSortOptionChange={onSortOptionChange} />
        </fieldset>
    );
};

export { ControlPanel };
