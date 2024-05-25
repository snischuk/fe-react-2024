import type { FC, MouseEventHandler } from 'react';
import { useEffect, useRef, useState } from 'react';

import IconArrowDown from '@icons/arrow-down.svg?react';

import styles from './SelectCustom.module.css';

const SORT_OPTIONS: string[] = ['Price (High - Low)', 'Price (Low - High)', 'Newest', 'Oldest'];

const SelectCustom: FC = () => {
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(SORT_OPTIONS[0]);
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
            setSelectedOption(optionValue);
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
                    <button className={styles.selectBtn} data-selected-option={selectedOption} type="button" onClick={onSelectClick}>
                        {selectedOption}
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
