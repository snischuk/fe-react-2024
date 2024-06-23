import type { FC, MouseEventHandler, RefObject } from 'react';

import { SelectCustom } from '@components/ui/SelectCustom/SelectCustom';
import IconSearch from '@icons/search.svg?react';
import type { FilterByCategoryHandler, SortOption, SortOptionClickHandler } from '@interfaces/ControlPanel';
import type { ProductFilterByCategory } from '@interfaces/Product';

import styles from './ControlPanel.module.css';

export type ProductCategoryName = Pick<ProductFilterByCategory, 'name'>;

interface ControlPanelProps {
    filtersOptionsByCategory: ProductFilterByCategory[];
    onFilterByCategoryClick: FilterByCategoryHandler;
    selectedFilterByCategory: ProductFilterByCategory;
    searchInputReference: RefObject<HTMLInputElement>;
    onSearchButtonClick: () => void;
    selectedSortOption: SortOption;
    onSortOptionClick: SortOptionClickHandler;
}

const ControlPanel: FC<ControlPanelProps> = ({
    filtersOptionsByCategory,
    selectedSortOption,
    onSortOptionClick,
    selectedFilterByCategory,
    onFilterByCategoryClick,
    onSearchButtonClick,
    searchInputReference,
}) => {
    const getFilterButtonClassName = (filterOption: ProductFilterByCategory) =>
        selectedFilterByCategory.id === filterOption.id ? `${styles.filterBtn} ${styles.filterBtnActive}` : styles.filterBtn;

    const onCategoryClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        const clickedFilterOptionId = (event.target as HTMLButtonElement).dataset.categoryId;
        const filterOption = filtersOptionsByCategory.find((option) => option.id.toString() === clickedFilterOptionId);
        if (filterOption) {
            onFilterByCategoryClick(filterOption as ProductFilterByCategory);
        }
    };

    return (
        <fieldset className={styles.controlPanel}>
            <fieldset className={styles.searchBar}>
                <input className={styles.searchInput} type="search" placeholder="Search..." ref={searchInputReference} />
                <button className={styles.searchBtn} onClick={onSearchButtonClick}>
                    <IconSearch className={styles.searchIcon} />
                </button>
            </fieldset>

            <fieldset className={styles.filterBar}>
                {filtersOptionsByCategory.map((filterOption: ProductFilterByCategory) => (
                    <button
                        className={getFilterButtonClassName(filterOption)}
                        key={filterOption.id}
                        data-category-id={filterOption.id}
                        onClick={onCategoryClick}
                    >
                        {filterOption.name}
                    </button>
                ))}
            </fieldset>

            <SelectCustom selectedSortOption={selectedSortOption} onSortOptionClick={onSortOptionClick} />
        </fieldset>
    );
};

export { ControlPanel };
