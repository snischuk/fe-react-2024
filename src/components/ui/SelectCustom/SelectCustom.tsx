import type { FC, MouseEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';

import IconArrowDown from '@icons/arrow-down.svg?react';
import type { SortOptionProps } from '@interfaces/SortOption';
import { SortOption } from '@interfaces/SortOption';

import styles from './SelectCustom.module.css';

const SORT_OPTIONS: SortOption[] = [SortOption.PRICE_HIGH_LOW, SortOption.PRICE_LOW_HIGH, SortOption.NEWEST, SortOption.OLDEST];

const SelectCustom: FC<SortOptionProps> = ({ selectedSortOption, onSortOptionChange }) => {
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [isFirstOptionHovered, setIsFirstOptionHovered] = useState<boolean>(false);

    const selectListReference = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (isSelectOpen) {
            document.addEventListener('click', onOutsideOptionsClick);
        } else {
            document.removeEventListener('click', onOutsideOptionsClick);
        }
        return () => {
            document.removeEventListener('click', onOutsideOptionsClick);
        };
    }, [isSelectOpen]);

    const onOutsideOptionsClick = (event: MouseEvent) => {
        if (!selectListReference.current?.contains(event.target as Element)) {
            setIsSelectOpen(false);
        }
    };

    const onSelectClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        setIsSelectOpen(true);
    };

    const onOptionClick: MouseEventHandler<HTMLLIElement> = (event) => {
        const optionValue = (event.target as HTMLLIElement).dataset.optionValue;

        if (optionValue) {
            onSortOptionChange(optionValue as SortOption);
        }

        setIsSelectOpen(false);
        setIsFirstOptionHovered(false);
    };

    const onFirstOptionMouseOver = () => {
        setIsFirstOptionHovered(true);
    };

    const onFirstOptionMouseOut = () => {
        setIsFirstOptionHovered(false);
    };

    const getSelectArrowClassName = (): string => {
        let className = styles.selectArrow;

        if (isSelectOpen) {
            className += ` ${styles.selectArrowRotated}`;
        }

        if (isFirstOptionHovered) {
            className += ` ${styles.selectArrowHovered}`;
        }

        return className;
    };

    return (
        <fieldset className={styles.selectBar}>
            <label className={styles.selectLabel}>Sort by:</label>

            <div className={styles.select}>
                {!isSelectOpen && (
                    <button className={styles.selectBtn} data-selected-option={selectedSortOption} type="button" onClick={onSelectClick}>
                        {selectedSortOption}
                    </button>
                )}

                {isSelectOpen && (
                    <ul className={styles.selectList} ref={selectListReference}>
                        {SORT_OPTIONS.map((option, index) => (
                            <li
                                className={styles.selectOption}
                                key={option}
                                data-option-value={option}
                                onClick={onOptionClick}
                                onMouseOver={index === 0 ? onFirstOptionMouseOver : undefined}
                                onMouseOut={index === 0 ? onFirstOptionMouseOut : undefined}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}

                <IconArrowDown className={getSelectArrowClassName()} />
            </div>
        </fieldset>
    );
};

export { SelectCustom };
