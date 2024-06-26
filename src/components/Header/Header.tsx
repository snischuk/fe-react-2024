import type { FC, MouseEvent } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useCart } from '@contexts/CartContext';
import { useTheme } from '@contexts/ThemeContext';
import IconCart from '@icons/cart.svg?react';
import IconLogo from '@icons/logo.svg?react';
import IconMenuBurger from '@icons/menu-burger.svg?react';
import IconSignin from '@icons/sign-in.svg?react';
import IconSignup from '@icons/sign-up.svg?react';
import IconThemeDark from '@icons/theme-mode-dark.svg?react';
import IconThemeDivider from '@icons/theme-mode-divider.svg?react';
import IconThemeLight from '@icons/theme-mode-light.svg?react';
import { ThemeMode } from '@interfaces/ThemeMode';
import { combineClasses } from '@utils/combineClasses';

import styles from './Header.module.css';

const Header: FC = () => {
    const { currentTheme, setCurrentTheme } = useTheme();
    const { currentCart } = useCart();

    const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        const clickedThemeMode = event.currentTarget.dataset.themeMode;

        if (clickedThemeMode) {
            setCurrentTheme(clickedThemeMode as ThemeMode);
        }
    };
    const getThemeClassName = (themeName: ThemeMode) =>
        themeName === currentTheme ? `${styles.headerThemeModeBtn} ${styles.headerThemeModeBtnActive}` : styles.headerThemeModeBtn;

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Link to="/">
                    <IconLogo className={styles.headerLogoIcon} />
                </Link>

                <div className={styles.headerThemeModeBtns}>
                    <button className={getThemeClassName(ThemeMode.LIGHT)} data-theme-mode="light" onClick={onButtonClick}>
                        <IconThemeLight className={styles.headerThemeModeBtnIcon} />
                    </button>
                    <IconThemeDivider />
                    <button className={getThemeClassName(ThemeMode.DARK)} data-theme-mode="dark" onClick={onButtonClick}>
                        <IconThemeDark className={styles.headerThemeModeBtnIcon} />
                    </button>
                </div>

                <div className={styles.headerPageLinks}>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.headerPageLink} ${styles.headerPageLinkActive}` : styles.headerPageLink
                        }
                        to="/"
                    >
                        About
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? `${styles.headerPageLink} ${styles.headerPageLinkActive}` : styles.headerPageLink
                        }
                        to="/products"
                    >
                        Products
                    </NavLink>
                </div>

                <button className={styles.headerCartBtn}>
                    <IconCart className={styles.headerCartIcon} />
                    {currentCart.length > 0 && <span className={styles.headerCartQuantity}>{currentCart.length}</span>}
                </button>

                <div className={styles.headerAuthBtns}>
                    <button className={combineClasses(styles.headerAuthBtn, styles.headerAuthBtnDark)}>
                        <IconSignin className={styles.headerAuthBtnIcon} />
                        Login
                    </button>
                    <button className={combineClasses(styles.headerAuthBtn, styles.headerAuthBtnAccent)}>
                        <IconSignup className={styles.headerAuthBtnIcon} />
                        Sign up
                    </button>
                </div>

                <button className={styles.headerBurgerBtn}>
                    <IconMenuBurger className={styles.headerBurgerIcon} />
                </button>
            </div>
        </header>
    );
};

export { Header };
