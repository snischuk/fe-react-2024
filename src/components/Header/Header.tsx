import { combineClasses } from '../../utils/combineClasses';

import styles from './header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <a href="./">
                    <svg className={styles.headerLogoIcon} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M38.6957 20C38.6957 30.3253 30.3253 38.6957 20 38.6957C9.67468 38.6957 1.30435 30.3253 1.30435 20C1.30435 9.67468 9.67468 1.30435 20 1.30435C30.3253 1.30435 38.6957 9.67468 38.6957 20ZM40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM20 8.69564L24.5423 17.4825L29.5652 13.4066V27.8261H10.4347V13.4066L15.4576 17.4825L20 8.69564ZM28.3859 24.8971V15.8235L25.0665 18.5066L28.3859 24.8971ZM23.6251 18.2199L20 11.215L16.3748 18.2199L20 21.1693L23.6251 18.2199ZM11.5922 24.8971L14.9116 18.5066L11.5922 15.8235V24.8971ZM15.8288 19.2645L11.9416 26.7405H28.0583L24.1711 19.2645L20 22.6441L15.8288 19.2645Z"
                        />
                    </svg>
                </a>

                <div className={styles.headerThemeModeBtns}>
                    <button className={styles.headerThemeModeBtn}>
                        <svg
                            className={styles.headerThemeModeBtnIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <g clipPath="url(#clip0_3001_1631)">
                                <path
                                    d="M10.0001 3.33329V1.66663M10.0001 16.6666V18.3333M5.34526 5.34514L4.16675 4.16663M14.7734 14.7733L15.952 15.9518M3.33341 9.99996H1.66675M16.6667 9.99996H18.3334M14.7738 5.34514L15.9524 4.16663M5.34567 14.7733L4.16716 15.9518M10.0001 14.1666C7.69889 14.1666 5.83341 12.3011 5.83341 9.99996C5.83341 7.69877 7.69889 5.83329 10.0001 5.83329C12.3013 5.83329 14.1667 7.69877 14.1667 9.99996C14.1667 12.3011 12.3013 14.1666 10.0001 14.1666Z"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </button>

                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2 20">
                        <path d="M1 0V20" stroke="#656565" />
                    </svg>

                    <button className={combineClasses([styles.headerThemeModeBtn, styles.headerThemeModeBtnActive])}>
                        <svg
                            className={styles.headerThemeModeBtnIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M7.5 4.99996C7.5 9.14209 10.8579 12.5 15 12.5C15.7577 12.5 16.4892 12.3879 17.1787 12.1789C16.2453 15.2585 13.3844 17.4998 10 17.4998C5.85786 17.4998 2.5 14.1422 2.5 10.0001C2.5 6.61565 4.74173 3.75482 7.82134 2.82141C7.61236 3.51089 7.5 4.24224 7.5 4.99996Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className={styles.headerPageLinks}>
                    <a className={combineClasses([styles.headerPageLink, styles.headerPageLinkActive])} href="#about">
                        About
                    </a>
                    <a className={styles.headerPageLink} href="#products">
                        Products
                    </a>
                </div>

                <button className={styles.headerCartBtn}>
                    <svg className={styles.headerCartIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22">
                        <path
                            d="M15.1699 16.3227C14.0654 16.3227 13.1699 17.2759 13.1699 18.4517C13.1699 19.6275 14.0654 20.5807 15.1699 20.5807C16.2745 20.5807 17.1699 19.6275 17.1699 18.4517C17.1699 17.2759 16.2745 16.3227 15.1699 16.3227ZM15.1699 16.3227H7.46387C7.00281 16.3227 6.77185 16.3227 6.58203 16.2353C6.41458 16.1583 6.2693 16.0343 6.16346 15.8761C6.04482 15.6989 5.99711 15.4618 5.90267 14.9926L3.44141 2.76567C3.34476 2.28556 3.29579 2.04577 3.17578 1.86645C3.06994 1.70829 2.92469 1.58381 2.75724 1.50678C2.56738 1.41943 2.33771 1.41943 1.87646 1.41943H1.16992M4.16992 4.61298H17.0431C17.7649 4.61298 18.1255 4.61298 18.3677 4.77304C18.5799 4.91324 18.7352 5.13313 18.803 5.38902C18.8803 5.68115 18.781 6.05004 18.5809 6.78828L17.1963 11.898C17.0767 12.3393 17.0169 12.5596 16.8955 12.7234C16.7884 12.868 16.6471 12.9811 16.487 13.0506C16.306 13.1291 16.091 13.1291 15.662 13.1291H5.90039M6.16992 20.5807C5.06535 20.5807 4.16992 19.6275 4.16992 18.4517C4.16992 17.2759 5.06535 16.3227 6.16992 16.3227C7.27449 16.3227 8.16992 17.2759 8.16992 18.4517C8.16992 19.6275 7.27449 20.5807 6.16992 20.5807Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className={styles.headerAuthBtns}>
                    <button className={combineClasses([styles.headerAuthBtn, styles.headerAuthBtnDark])}>
                        <svg
                            className={styles.headerAuthBtnIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Login
                    </button>

                    <button className={combineClasses([styles.headerAuthBtn, styles.headerAuthBtnAccent])}>
                        <svg
                            className={styles.headerAuthBtnIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M19 16V13M19 13V10M19 13H16M19 13H22M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Sign up
                    </button>
                </div>

                <button className={styles.headerBurgerBtn}>
                    <svg
                        className={styles.headerBurgerIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                    >
                        <path
                            d="M3.75 18.75H26.25M3.75 11.25H26.25"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
}

export { Header };
